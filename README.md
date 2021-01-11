<div align="center">
<a name="title"></a>
<img src="https://github.com/vsilvadev/gofinances-frontend/blob/main/src/assets/logo.svg" alt="Go Finances Logo">
</div>

<p align="center">GoFinances is a web-based finance control project aimed at making it easier for people to manage their money</p>

<h2>📋 Summary</h2>
  • <a href="#title">Title</a> <br>
  • <a href="#project_status">Project Status</a> <br>
  • <a href="#features">Features</a> <br>
  • <a href="#application">The Application</a> <br>
  • <a href="#how-to">How to run</a> <br>
  • <a href="#tech">Technologies</a> <br>
  • <a href="#author">Author</a> <br>

<h2>🚀 Project Status<a name="project_status"></a></h2>
✅ Completed

<h2>💡 Features<a name="features"></a></h2>

- [x] View total value of incomes, outcomes and balance.
- [x] View all transactions made with their value and date
- [x] Insert new transactions using a csv file

<h2>🖥 The Application<a name="application"></a></h2>
<img src="https://github.com/vsilvadev/gofinances-frontend/blob/main/git_files/gofinances-gif.gif" alt="Running Application">

<h2>❗ How to run<a name="how-to"></a></h2>
<h3>Prerequisites</h3>
Before starting, you will need to have the following tools installed on your machine<br><br>
<a href="https://git-scm.com">
<img src="https://img.shields.io/static/v1?label=Install&message=GIT&color=f14e32&style=for-the-badge"/>
</a>
<br>
<a href="https://nodejs.org">
<img src="https://img.shields.io/static/v1?label=Install&message=NODE.JS&color=43853d&style=for-the-badge"/>
</a>
<br>
<a href="https://classic.yarnpkg.com/en/docs/install/#windows-stable">
<img src="https://img.shields.io/static/v1?label=Install&message=YARN&color=2188b6&style=for-the-badge"/>
</a>
<br>
<a href="https://www.docker.com/get-started">
<img src="https://img.shields.io/static/v1?label=Install&message=DOCKER&color=0db7ed&style=for-the-badge"/>
</a>

<h3>Running the project</h3>
<h4>Create a container for Postgres using Docker</h4>
<pre>
docker run --name gofinances-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
</pre>

<h4>Clone this repository</h4>
<pre>
$ git clone https://github.com/vsilvadev/gofinances-backend.git
</pre>

<h4>Access the project folder in the terminal/cmd</h4>
<pre>
$ cd gofinances-backend
</pre>

<h4>Install the dependencies</h4>
<pre>
$ yarn 
</pre>

<h4Run database migrations</h4>
<pre>
$ yarn typeorm migration:run
</pre>

<h4>Run the application</h4>
<pre>
$ yarn dev:server
</pre>

📌 To see the app running you will need to have the front-end on. You can get more information about the back-end at https://github.com/vsilvadev/gofinances-frontend

<h2>🛠 Technologies<a name="tech"></a></h2>
The following tools were used in the construction of the project: <br><br>

• TypeScript <br>
• NodeJS <br>
• Express <br>
• Docker <br>
• Postgres<br>
• TypeORM <br>

<h2>⭐ Author<a name="author"></a></h2>
<h3>Vitor Silva</h3> 
<img src="https://avatars3.githubusercontent.com/u/60434378?s=400&u=f3497d52861de514e8a1973fd3dce8132ed7aa8d&v=4" alt="Author" width="100" height="100">
Get in touch: <br>
💼 <a href="https://www.linkedin.com/in/vitor-andre-batista-silva/">LinkedIn</a><br>
📧 <a href="mailto:vitorabsilva10@gmail.com">Email</a><br>
🚀 <a href="https://app.rocketseat.com.br/me/function">Rocketseat</a>
