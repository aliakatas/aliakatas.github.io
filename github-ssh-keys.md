# How to add SSH keys to Github account
It is better to have different keys for each machine you access Github from.
In order to generate the keys, `ssh-keygen` needs to be installed to the system.

More detailed instructions can be found on the official pages [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

## Generate
Open a terminal and run the following command:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When prompted about the location and file name to save the key to, keep in mind that leaving the default (just pressing Enter) will overwrite any existing keys with the same file name:
```bash
> Enter a file in which to save the key (/home/USER/.ssh/id_ALGORITHM):[Press enter]
```

Using a passphrase is recommended by not required:
```bash
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```

## Add to the agent
Start the agent in the background by running:
```bash
$ eval "$(ssh-agent -s)"
> Agent pid 12345
```

Then proceed with adding to the agent:
```bash
ssh-add ~/.ssh/id_ALGORITHM
```

Finally, the public key needs to be added to your Github account. 
To do this, first get a copy of the content of the public key file:
```bash
cat ~/.ssh/id_ALGORITHM.pub
```
or open it in a text editor.

Once the copy is in the clipboard, open the Settings page of your Github account and go to [Access > SSH and GPG keys](https://github.com/settings/keys).
Fill in the relevant fields to complete the process.

