# Budget-Buddy

Web Application To Record And Monitor Your Spending Habits.

## 📘 Project Description

Budget-Buddy is a full-stack financial record-keeping web application designed to help users manage their expenses with ease and clarity. Built with Next.js and powered by PostgreSQL via Prisma ORM, the app offers a seamless experience for tracking, visualizing, and organizing financial data.
Users can perform full CRUD operations on their expenses, view interactive graphs powered by Recharts, and navigate a clean, responsive interface styled with Tailwind CSS, HTML, and CSS. The integration of Shadcn UI ensures a modern and accessible design system, while TypeScript and React provide a robust and scalable codebase.
Whether you're budgeting for personal goals or analyzing spending trends, Budget-Buddy delivers a reliable and intuitive platform for financial awareness

Great! Here's a well-structured Getting Started section for your project that includes instructions for setting up the DATABASE_URL with a MongoDB API key, configuring Prisma, and initializing the database:

## ✨ Features

Budget-Buddy offers a comprehensive suite of tools to help users manage and visualize their financial data:

- 🧾 Add Expenses with Strategic Categorization
  Log expenses under predefined or custom categories such as Food, Travel, Utilities, etc., enabling smarter tracking and analysis.
- 📋 View and Manage Expense History
  Access a detailed list of all recorded expenses with options to edit or delete entries for accurate record-keeping.
- 📊 Monthly Expense Bar Graph
  Visualize your spending trends over time with an interactive bar chart, making it easy to identify peaks and patterns.
- 🥧 Categorical Expense Pie Chart
  Understand your spending distribution across categories with a dynamic pie chart, offering insights into where your money goes.
- ⚡ Responsive and Intuitive UI
  Built with Shadcn UI and Tailwind CSS, the app adapts seamlessly across devices for a smooth user experience.
- 🔍 Fast and Reliable Backend
  Powered by Next.js, Prisma ORM, and PostgreSQL (or MongoDB), ensuring efficient data handling and scalability

## 🚀 Getting Started

To get your local development environment up and running, follow these steps:

1. 📦 Clone the Repository
   git clone https://github.com/deepakdroi/budget-buddy
   cd budget-buddy

2. 🔐 Set Up Environment Variables
   Create a .env file in the root directory and add your MongoDB connection string:
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"


💡 Note: If you prefer to use another database (e.g., PostgreSQL or MySQL), update the provider field in prisma/schema.prisma accordingly:

datasource db {
provider = "postgresql" // or "mysql", "sqlite", "mongodb"
url = env("DATABASE_URL")
}

3. 📐 Configure Prisma
   Install dependencies and initialize Prisma:
   -npm install
   -npx prisma generate

If you're starting fresh, run the following to create the initial migration and push the schema to your database:
-npx prisma db push

🛠️ For relational databases (like PostgreSQL), you may prefer using migrations:

-npx prisma migrate dev --name init

4. 🏃‍♂️ Run the Development Server
   -npm run dev

Your app should now be running at http://localhost:3000 🎉

## Help

Any advise for common problems or issues or want to report any bug feel free to reach me at the discord link below.
Feel free to team up with me and add new features and work on new ideas.

https://discord.gg/EkMxMwxFtz

## Authors

Deepak Mahto
email: deepak.mahto706@gmail/com

## Version History

- Still under development so no version yet

## Acknowledgments

Inspiration, code snippets, etc.

- [NextJS](https://nextjs.org/)
- [Shadcn](https://www.shadcnblocks.com/)
- [Prisma](https://www.prisma.io/)
