import inquirer from "inquirer";
import chalk from "chalk";

const posts = [];

function mainMenu() {
  console.log(chalk.green("\nWelcome to the Blog CLI!"));

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Create a new post", "View all posts", "Edit Post", "Exit"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Create a new post":
          createPost();
          break;
        case "View all posts":
          viewPosts();
          break;
        case "Edit Post":
          editPosts();
          break;
        case "Exit":
          console.log(chalk.blue("Goodbye!"));
          process.exit();
          break;
      }
    });
}

function createPost() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Post Title:",
      },
      {
        type: "input",
        name: "content",
        message: "Post Content:",
      },
    ])
    .then((answers) => {
      const post = {
        title: answers.title,
        content: answers.content,
      };
      posts.push(post);
      console.log(chalk.green("Post created successfully!"));
      mainMenu();
    });
}

function viewPosts() {
  if (posts.length === 0) {
    console.log(chalk.yellow("No posts available."));
  } else {
    posts.forEach((post, index) => {
      console.log(chalk.bgGray(`\nPostId: #${index + 1} `));
      console.log(chalk.bgBlue(`Title: ${post.title} `));
      console.log(chalk.blue(`Content: ${post.content}`));
    });
    console.log("\n---------------");
    console.log(`Total Posts: ${posts.length}`);
    console.log("---------------");
  }
  mainMenu();
}

function editPosts() {
  let postsIds = [];
  posts.forEach((post, index) => {
    postsIds.push(index + 1);
  });
  if (posts.length === 0) {
    console.log(chalk.yellow("No post to edit"));
  } else {
    let selected = null;
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Choose which the postId",
          choices: postsIds,
        },
        {
          type: "input",
          name: "title",
          message: "Post Title:",
        },
        {
          type: "input",
          name: "content",
          message: "Post Content:",
        },
        {
          type: "confirm",
          name: "isSave",
          message: "Changes will ovewrite this post data. Save all changes?",
        },
      ])
      .then((answers) => {
        selected = answers.action;
        const post = {
          title: answers.title,
          content: answers.content,
        };
        posts[selected - 1] = post
        console.log(chalk.bgGray(`\nPostId: #${selected} `));
        console.log(chalk.bgBlue(`Title: ${posts[selected - 1].title} `));
        console.log(chalk.blue(`Content: ${posts[selected - 1].content}`));
        console.log(chalk.green("Post updated successfully!"));
        mainMenu();
      });
    
  }
}

function updatePost(id) {}

mainMenu();
