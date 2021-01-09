# Contributing Guidelines

These set of guidelines are meant to improve code quality (in terms of readability and consistency) and make workflow efficient. 😊

## Things to consider

- Make sure to format the code properly. (You can use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- Class names in CSS should be specific so that it is less ambiguous and less prone to class name conflicts, since at the end webpack would compile all the style files into a single style file.

  - One trick would be to **use scopes**, like inside of a modal (with class `.modal`) if you have a heading div/span (with a class of `.heading`), you can specifically define the styles for those headings which are only inside of `.modal` by doing so: `.modal .heading`

    **Example:**

    HTML:

    ```html
    <div class="modal">
      <div class="heading">Heading</div>
      ...
    </div>
    ```

    CSS:

    ```css
    .modal .heading {
      /* Define styles here for modal headings */
    }
    ```

  - Another trick would be to **prefix the class names with component name** (like, instead of `.heading` for modal, `.modal-heading` could be used).

    **Example:**

    HTML:

    ```html
    <div class="modal">
      <div class="modal-heading">Heading</div>
      ...
    </div>
    ```

    CSS:

    ```css
    .modal-heading {
      /* Define styles here for modal headings */
    }
    ```

- Assets and Component names should be straight-forward. Component names must follow camel casing with the first letter capitalized (eg. `HelloWorld.js` or `HelloWorld.jsx`)
- Make sure to add spaces between different tokens. For example, instead of `x=y+1`, use `x = y + 1`.
- Omit spaces when passing data as props or when passing any values as arguments to a class/function. For example,

  ```html
  <Component prop="{someVariable}"></Component>
  ```

- Use camel casing within JavaScript source files wherever possible.

  ```js
  let helloWorld = "hello world";
  function helloWorld() {}
  class HelloWorld {}
  ```

- Do add a line break at the end of files.

## Workflow Guidelines

> If you use fork of this project. You may want to refer to the following.
>
> Before you start, you will need to install [`git`](https://git-scm.com/) if not already installed in your machine.

1. Fork the project.
2. Clone the fork on your machine.
3. Open Command Prompt/Terminal in this directory.
4. Type the following (_This is just a one-time thing_)

   ```bash
   git remote add upstream https://github.com/Akshat-sharma-21/a-team.git
   ```

5. _Make changes to your code._
6. Run `git fetch upstream master` to get changes from original repository.
7. Then, `git merge upstream/master` for merging those commits with your local changes.
8. For the most part _Step 7_ will automatically merge all the changes from upstream. If it doesn't, it will give you Merge Conflict error wherein you need to manually resolve those conflics. You can use VSCode to resolve any such merge conflics if they exist.
9. Using VSCode's Source Control Interface _(if you are using VSCode)_, select the files that you want to push to the repository. Write a meaningful commit message so that it's easy to track down the changes during review and later on. After you make sure that the correct files have been staged and the commit message is appropriate, commit them.
10. Finally, make a pull request from your fork to this Repository.

**Note:**

- You mostly have to deal with steps 5 through 10 most of the time.

- Steps 8 and 9 might require some googling as you might initially encounter some doubts.
