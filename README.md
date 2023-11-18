# sidekick-opener README

This vscode extensions opens .test.ts|tsx, .spec.ts|ts, scss, css files on the right side and closes the original file.

Limitations:
Because limitations with vscode API I have to open a new file and then close the original right side file. This causes a flash with the files
This also doesn't work if the file is already opened.
It is hard coded css and test on right side.

Potential future features:
Open all other files on the left side.
Investigate different activation events to optimize performance
