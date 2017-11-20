# zazu-ssh

A plugin for zazu that integrates ssh sessions.

## KiTTy

This plugin can start KiTTy sessions. To do so, it needs to know where to find
KiTTy. This is done by passing variables to the plugin:

[json]
```
{
	...
	"plugins": [
		...
		{
			"name": "maienm/zazu-ssh",
			"variables": {
				"kitty": KITTY_CONFIG
			}
		}
	]
}
```

The format of `KITTY_CONFIG` is as follows:

```
{
	"path": "C:\\path\\to\\kitty.exe",
	"sessions": "C:\\path\\to\\sessions",
	"filter": "^[^.]"
}
```

`path` should be the path to `kitty.exe`. If this is the only option you want
to pass, you can set `KITTY_CONFIG` to a string, and it will be assumed to be
this option, using defaults for everything else.

`sessions` should be the path to the directory containing the sessions. If this
is not specified, the sessions are assumed to be in a folder named `sessions`
in the same directory as `path`.

`filter` is a regular expression to filter which session files should be
displayed. Default is to exclude files starting with a period (`.`).

