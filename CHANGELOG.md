# Changelog

## [0.1.0-beta.4](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-beta.3..v0.1.0-beta.4)(2023-08-30)

## Features

- feat: sendersAddr, add options validation, and fix payload format
- feat: add cache to registry

## Fix

- fix: weight limit check issue
- fix: Re-implement AssetHub ForeignAsset queries
- fix: add ENUM for organizing error, and apply to stack
- fix: resolve TODO for destId for relay chains
- fix: empty string assetId Balances bug for local tx
- fix: replace all unsafe instances of parseInt
- fix: unused conditional, and DRY cache logic in checkParaAssets

## Docs

- docs: update README & docs

## Chore

- chore(yarn): bump yarn

## CI

- ci: semantic title check

## [0.1.0-beta.3](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-beta.2..v0.1.0-beta.3)(2023-08-21)

## Fix

- fix: Update System Parachain Id check based on chainId 
- fix: remove incorrect reference to '0' for Native Relay Token

## Features

- feat: add poolAssets support
- feat: add support for xTokens pallet

## Docs

- docs: update README.md 

## Chore

- chore(deps): bump word-wrap from 1.2.3 to 1.2.5
- chore(examples): add payload paysWithFeeOrigin example
- chore(deps): bump semver from 6.3.0 to 6.3.1
- chore: update naming to support AssetHub specnames 

## [0.1.0-beta.2](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-beta.1..v0.1.0-beta.2)(2023-08-09)

## Fix

- fix: added unpaidExecution for testnet XCM message

## Features

- feat: ParaToSystem
- feat: SystemToSystem
- feat: add support for foreign asset multilocations

## Chore

- chore: cleanup tech debt
- chore(yarn): bump yarn
- chore: remove grocers' apostrophe

## [0.1.0-beta.1](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-beta.0..v0.1.0-beta.1)(2023-06-21)

## Chore

- chore(registry): update registry

## [0.1.0-beta.0](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.5..v0.1.0-beta.0)(2023-06-16)

### Stable Beta is here!

- Add `AssetsTransferApi.fetchFeeInfo`
- Add `AssetsTransferApi.regsitry` which exposes a bunch of useful functionality now. Check out the following [PR #183](https://github.com/paritytech/asset-transfer-api/pull/183)
- Implement `paysWithFeeOrigin` as an option for `AssetsTransferApi.createTransferTransaction`
- Fix type issues for `SystemToPara`
- Add examples
- Update polkadot-js deps
- More verbose errors for when multiple identical assets symbols exists in the same registry.
- Fix ascending order for multiple multi assets for `SystemToPara`.
- Export types at top level.
- Add `dest`, and `origin` to `TxResult<T>`.
- Update `fetchFeeInfo` to take in `call`, and `payload` types.

NOTE - The API is considered stable for the following direction:

- RelayToPara
- RelayToSystem
- SystemToRelay
- SystemToPara

## [0.1.0-alpha.5](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.4..v0.1.0-alpha.5)(2023-06-07)

- Breaking Change: Rework `AssetTransferApi` constructor, and `constructApiPromise`
- Check primitive and object types for `createTransferTransaction` inputs
- Fix CI set-output
- Add function to get General Index of a valid token symbol
- Ensure a user can input a native token symbol or an empty array for relay directions
- Update tests to use v9420 metadata
- Add `decodeExtrinsic` to `AssetsTransferApi`
- Add balances pallet support for local transfers on relay, and system parachains
- Set `RelayToPara` AssetType explicitly to Foreign
- Ensure MultiAsset Ordering

## [0.1.0-alpha.4](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.3..v0.1.0-alpha.4)(2023-05-30)

- change isNative to isRelayNative for System to Para 
- Add additional xcmDirection validation checks, fix SystemToRelay AssetType

## [0.1.0-alpha.3](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.2..v0.1.0-alpha.3) (2023-05-30)

- Fix bug in args passed into ext construction

## [0.1.0-alpha.2](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.1..v0.1.0-alpha.2) (2023-05-29)

- Update polkadot-js deps
- Support for Ethereum addresses
- Proper xcm input validation for assetIds
- Fix xcm construction of parents field for SystemToPara
- Add teleport logic for native vs foreign assets
- Add fee estimation
- Improve github pages docs
- Add registry functionality, as well as `injectedRegistry`
- Add V3 support, and remove V1 and V0 support

## [0.1.0-alpha.1](https://github.com/paritytech/asset-transfer-api/compare/v0.1.0-alpha.0..v0.1.0-alpha.1) (2023-03-21)

- Include V1 and V0 support
- Add local transaction support
- Fix local types
- Update polkadot-js deps

## [0.1.0-alpha.0](https://github.com/paritytech/asset-transfer-api/reelases/v0.1.0-alpha.0)

- First Alpha release
