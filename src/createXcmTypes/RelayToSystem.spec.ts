// Copyright 2023 Parity Technologies (UK) Ltd.

import { Registry } from '../registry';
import { mockRelayApi } from '../testHelpers/mockRelayApi';
import { RelayToSystem } from './RelayToSystem';

describe('RelayToSystem XcmVersioned Generation', () => {
	const registry = new Registry('kusama', {});
	describe('Beneficiary', () => {
		it('Should work for V2', () => {
			const beneficiary = RelayToSystem.createBeneficiary(
				mockRelayApi,
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
			const beneficiary = RelayToSystem.createBeneficiary(
				mockRelayApi,
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
			const destination = RelayToSystem.createDest(mockRelayApi, '100', 2);

			const expectedRes = {
				v2: {
					parents: 0,
					interior: {
						x1: {
							parachain: 100,
						},
					},
				},
			};

			expect(destination.toJSON()).toStrictEqual(expectedRes);
		});
		it('Should work for V3', () => {
			const destination = RelayToSystem.createDest(mockRelayApi, '100', 3);

			const expectedRes = {
				v3: {
					parents: 0,
					interior: {
						x1: {
							parachain: 100,
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
			const assets = await RelayToSystem.createAssets(
				mockRelayApi,
				['100'],
				2,
				'',
				[],
				{
					registry,
					isForeignAssetsTransfer,
					isLiquidTokenTransfer,
				}
			);

			const expectedRes = {
				v2: [
					{
						fun: {
							fungible: 100,
						},
						id: {
							concrete: {
								interior: {
									here: null,
								},
								parents: 0,
							},
						},
					},
				],
			};

			expect(assets.toJSON()).toStrictEqual(expectedRes);
		});
		it('Should work for V3', async () => {
			const assets = await RelayToSystem.createAssets(
				mockRelayApi,
				['100'],
				3,
				'',
				[],
				{
					registry,
					isForeignAssetsTransfer,
					isLiquidTokenTransfer,
				}
			);

			const expectedRes = {
				v3: [
					{
						fun: {
							fungible: 100,
						},
						id: {
							concrete: {
								interior: {
									here: null,
								},
								parents: 0,
							},
						},
					},
				],
			};

			expect(assets.toJSON()).toStrictEqual(expectedRes);
		});
	});
	describe('WeightLimit', () => {
		// NOTE: for V0, V1, and V2 Weightlimit just uses V2 so we only need to test once.
		// No matter the version if its equal to or less than 2, it will alwyas default to V2.
		it('Should work when isLimited is true', () => {
			const isLimited = true;
			const refTime = '100000000';
			const proofSize = '1000';

			const weightLimit = RelayToSystem.createWeightLimit(mockRelayApi, {
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
			const weightLimit = RelayToSystem.createWeightLimit(mockRelayApi, {});

			expect(weightLimit.toJSON()).toStrictEqual({
				unlimited: null,
			});
		});
	});
});
