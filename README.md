# TaskNote

A modern, intuitive task management application built with React and motion animations. TaskNote helps you organize and track your tasks with a beautiful, responsive interface.

## Features

- **Drag and Drop Interface**: Move task cards around freely with smooth animations
- **Category Management**: Organize tasks by Work, Personal, Study, Health, and Others
- **Priority Levels**: Assign Low, Medium, or High priority to each task
- **Filtering System**: Filter tasks by category, completion status, or search terms
- **Persistent Storage**: All tasks are saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Animations**: Smooth transitions and micro-interactions powered by motion

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SabbirCodes/TaskNote.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

- React
- react-icons
- motion/react
- Tailwind CSS

## Usage

### Adding Tasks
Click the "New Task" button to open the task creation form. Enter a description, select priority and category, then click "Add Task".

### Managing Tasks
- **Mark as Complete**: Click the checkmark button on a task card
- **Delete Task**: Click the X button on a task card
- **Move Task**: Drag and drop a task to reposition it
- **Filter Tasks**: Use the category buttons to filter by type
- **Search**: Type in the search box to find specific tasks
- **View Options**: Select "All Tasks", "Active Only", or "Completed Only" from the dropdown

### Task Categories
- **Work**: Professional tasks and responsibilities
- **Personal**: Personal projects and errands
- **Study**: Learning objectives and educational tasks
- **Health**: Fitness goals and health-related activities
- **Others**: Miscellaneous tasks that don't fit other categories

## Customization

### Themes
The application comes with a dark theme by default. You can modify the colors in the Tailwind configuration file to customize the appearance.

### Adding New Categories
To add new categories, modify the `categories` array in the `CategoryFilter` component.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

