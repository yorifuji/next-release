# next-latest-release

`next-latest-release`` is a GitHub Action designed to automate the process of version bumping in software releases. It supports major, minor, and patch version increments, making it easy to retrieve the next version based on the latest GitHub Release.

## Usage

Example workflow:

```yaml
jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
      - uses: yorifuji/next-latest-release@v1
        id: next-latest-release
        with:
          bump: major # major, minor, or patch

      - run: |
          echo "version: ${{ steps.next-latest-release.outputs.version }}"
          echo "major: ${{ steps.next-latest-release.outputs.major }}"
```

## Development

TBD

### Setup

TBD

### Debug

TBD

## License

MIT
