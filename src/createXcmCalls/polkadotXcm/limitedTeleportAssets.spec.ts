import type { ApiPromise } from '@polkadot/api';

import { Registry } from '../../registry';
import { mockSystemApi } from '../../testHelpers/mockSystemApi';
import { Direction } from '../../types';
import { limitedTeleportAssets } from './limitedTeleportAssets';

describe('limitedTeleportAssets', () => {
	const registry = new Registry('statemine', {});
	describe('SystemToPara', () => {
		const isLiquidTokenTransfer = false;
		it('Should correctly construct a tx for a system parachain with V2', async () => {
			const isLimited = true;
			const refTime = '1000000000';
			const proofSize = '2000';

			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = false;

			const ext = await limitedTeleportAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				['1'],
				['100'],
				'1000',
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
				'0x1501041f0901010100a10f0100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b010400000204320504009101000000000102286bee411f'
			);
		});
		it('Should error when a api does not support the required pallets', async () => {
			const mockApi = { tx: {} } as unknown as ApiPromise;
			const paysWithFeeDest = undefined;
			const isForeignAssetsTransfer = false;

			await expect(async () => {
				await limitedTeleportAssets(
					mockApi,
					Direction.SystemToPara,
					'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
					['1'],
					['100'],
					'1000',
					2,
					'statemine',
					registry,
					{
						paysWithFeeDest,
						isLiquidTokenTransfer,
						isForeignAssetsTransfer,
					}
				);
			}).rejects.toThrowError(
				"Can't find the `polkadotXcm` or `xcmPallet` pallet with the given API"
			);
		});
	});
});
