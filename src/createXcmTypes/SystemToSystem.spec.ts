// Copyright 2023 Parity Technologies (UK) Ltd.

import { Registry } from '../registry';
import { mockSystemApi } from '../testHelpers/mockSystemApi';
import { SystemToSystem } from './SystemToSystem';

describe('SystemToSystem XcmVersioned Generation', () => {
	const registry = new Registry('statemine', {});

	describe('Beneficiary', () => {
		it('Should work for V2', () => {
			const beneficiary = SystemToSystem.createBeneficiary(
				mockSystemApi,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				2
			);

			const expectedRes = {
				v2: {
					parents: 0,
					interior: {
						x1: {
							accountId32: {
								id: '0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
								network: {
									any: null,
								},
							},
						},
					},
				},
			};

			expect(beneficiary.toJSON()).toStrictEqual(expectedRes);
		});
		it('Should work for V3', () => {
			const beneficiary = SystemToSystem.createBeneficiary(
				mockSystemApi,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				3
			);

			const expectedRes = {
				v3: {
					parents: 0,
					interior: {
						x1: {
							accountId32: {
								id: '0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
								network: null,
							},
						},
					},
				},
			};

			expect(beneficiary.toJSON()).toStrictEqual(expectedRes);
		});
	});
	describe('Destination', () => {
		it('Should work for V2', () => {
			const destination = SystemToSystem.createDest(mockSystemApi, '1000', 2);

			const expectedRes = {
				v2: {
					parents: 1,
					interior: {
						x1: {
							parachain: 1000,
						},
					},
				},
			};

			expect(destination.toJSON()).toStrictEqual(expectedRes);
		});
		it('Should work for V3', () => {
			const destination = SystemToSystem.createDest(mockSystemApi, '1002', 3);

			const expectedRes = {
				v3: {
					parents: 1,
					interior: {
						x1: {
							parachain: 1002,
						},
					},
				},
			};

			expect(destination.toJSON()).toStrictEqual(expectedRes);
		});
	});

	describe('Assets', () => {
		const isForeignAssetsTransfer = false;
		const isLiquidTokenTransfer = false;

		it('Should work for V2', async () => {
			const assets = await SystemToSystem.createAssets(
				mockSystemApi,
				['100'],
				2,
				'statemine',
				['USDT'],
				{
					registry,
					isForeignAssetsTransfer,
					isLiquidTokenTransfer,
				}
			);

			const expectedRes = {
				v2: [
					{
						id: {
							concrete: {
								parents: 0,
								interior: {
									x2: [{ palletInstance: 50 }, { generalIndex: 11 }],
								},
							},
						},
						fun: {
							fungible: 100,
						},
					},
				],
			};

			expect(assets.toJSON()).toStrictEqual(expectedRes);
		});
		it('Should work for V3', async () => {
			const assets = await SystemToSystem.createAssets(
				mockSystemApi,
				['100'],
				3,
				'bridge-hub-kusama',
				['ksm'],
				{
					registry,
					isForeignAssetsTransfer,
					isLiquidTokenTransfer,
				}
			);

			const expectedRes = {
				v3: [
					{
						id: {
							concrete: {
								parents: 1,
								interior: {
									here: null,
								},
							},
						},
						fun: {
							fungible: 100,
						},
					},
				],
			};

			expect(assets.toJSON()).toStrictEqual(expectedRes);
		});

		it('Should error when asset ID is not found for V3', async () => {
			const expectedErrorMessage =
				'bridge-hub-kusama has no associated token symbol usdc';

			await expect(async () => {
				await SystemToSystem.createAssets(
					mockSystemApi,
					['100'],
					3,
					'bridge-hub-kusama',
					['usdc'],
					{
						registry,
						isForeignAssetsTransfer,
						isLiquidTokenTransfer,
					}
				);
			}).rejects.toThrowError(expectedErrorMessage);
		});
		it('Should work for a liquid token transfer', async () => {
			const assets = await SystemToSystem.createAssets(
				mockSystemApi,
				['100'],
				2,
				'statemine',
				['USDT'],
				{
					registry,
					isForeignAssetsTransfer,
					isLiquidTokenTransfer: true,
				}
			);

			const expectedRes = {
				v2: [
					{
						id: {
							concrete: {
								parents: 0,
								interior: {
									x2: [{ palletInstance: 55 }, { generalIndex: 11 }],
								},
							},
						},
						fun: {
							fungible: 100,
						},
					},
				],
			};

			expect(assets.toJSON()).toStrictEqual(expectedRes);
		});
	});
	describe('WeightLimit', () => {
		it('Should work when isLimited is true', () => {
			const isLimited = true;
			const refTime = '100000000';
			const proofSize = '1000';

			const weightLimit = SystemToSystem.createWeightLimit(mockSystemApi, {
				isLimited,
				weightLimit: {
					refTime,
					proofSize,
				},
			});
			expect(weightLimit.toJSON()).toStrictEqual({
				limited: {
					refTime: 100000000,
					proofSize: 1000,
				},
			});
		});
		it('Should work when isLimited is falsy', () => {
			const weightLimit = SystemToSystem.createWeightLimit(mockSystemApi, {});

			expect(weightLimit.toJSON()).toStrictEqual({
				unlimited: null,
			});
		});
	});
});
