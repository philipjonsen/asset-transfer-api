// Copyright 2023 Parity Technologies (UK) Ltd.

import type { ApiPromise } from '@polkadot/api';

import { Registry } from '../../registry';
import { mockSystemApi } from '../../testHelpers/mockSystemApi';
import { Direction } from '../../types';
import { limitedReserveTransferAssets } from './limitedReserveTransferAssets';

describe('limitedReserveTransferAssets', () => {
	const registry = new Registry('statemine', {});
	describe('SystemToPara', () => {
		const isLiquidTokenTransfer = false;
		it('Should correctly construct a tx for a system parachain with V2', async () => {
			const isLimited = true;
			const refTime = '1000';
			const proofSize = '2000';

			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = false;
			const ext = await limitedReserveTransferAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				['1'],
				['100'],
				'2023',
				2,
				'statemine',
				registry,
				{
					isLimited,
					weightLimit: {
						refTime,
						proofSize,
					},
					paysWithFeeDest,
					isLiquidTokenTransfer,
					isForeignAssetsTransfer,
				}
			);

			expect(ext.toHex()).toBe(
				'0x0d01041f08010101009d1f0100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b0104000002043205040091010000000001a10f411f'
			);
		});
		it('Should correctly construct a tx for when a weightLimit is available', async () => {
			const isLimited = true;
			const refTime = '1000000000';
			const proofSize = '2000';

			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = false;
			const ext = await limitedReserveTransferAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				['1'],
				['100'],
				'2023',
				2,
				'statemine',
				registry,
				{
					isLimited,
					weightLimit: {
						refTime,
						proofSize,
					},
					paysWithFeeDest,
					isLiquidTokenTransfer,
					isForeignAssetsTransfer,
				}
			);

			expect(ext.toHex()).toBe(
				'0x1501041f08010101009d1f0100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b010400000204320504009101000000000102286bee411f'
			);
		});

		it('Should error when a api does not support the required pallets', async () => {
			const isLimited = true;
			const refTime = '1000000000';
			const proofSize = '2000';

			const mockApi = { tx: {} } as unknown as ApiPromise;
			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = true;
			await expect(async () => {
				await limitedReserveTransferAssets(
					mockApi,
					Direction.SystemToPara,
					'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
					['1'],
					['100'],
					'2023',
					2,
					'statemine',
					registry,
					{
						isLimited,
						weightLimit: {
							refTime,
							proofSize,
						},
						paysWithFeeDest,
						isLiquidTokenTransfer,
						isForeignAssetsTransfer,
					}
				);
			}).rejects.toThrowError(
				"Can't find the `polkadotXcm` or `xcmPallet` pallet with the given API"
			);
		});

		it('Should correctly construct a foreign asset tx for a system parachain with V2', async () => {
			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = true;
			const ext = await limitedReserveTransferAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				[
					'{"parents":"1","interior":{ "X2":[{"Parachain":"2125"},{"GeneralIndex":"0"}]}}',
				],
				['100'],
				'2023',
				2,
				'statemine',
				registry,
				{
					paysWithFeeDest,
					isLiquidTokenTransfer,
					isForeignAssetsTransfer,
				}
			);

			expect(ext.toHex()).toBe(
				'0x0901041f08010101009d1f0100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b0104000103043500352105000091010000000000'
			);
		});

		it('Should correctly construct a foreign asset tx for when a weightLimit is available', async () => {
			const isLimited = true;
			const refTime = '1000000000';
			const proofSize = '2000';

			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = true;
			const ext = await limitedReserveTransferAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				[
					'{"parents":"1","interior":{ "X2":[{"Parachain":"2125"},{"GeneralIndex":"0"}]}}',
				],
				['100'],
				'2023',
				2,
				'statemine',
				registry,
				{
					isLimited,
					weightLimit: {
						refTime,
						proofSize,
					},
					paysWithFeeDest,
					isLiquidTokenTransfer,
					isForeignAssetsTransfer,
				}
			);

			expect(ext.toHex()).toBe(
				'0x2101041f08010101009d1f0100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b010400010304350035210500009101000000000102286bee411f'
			);
		});
	});
});
