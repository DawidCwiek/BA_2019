const initialData = {
    task: {
      'task-1': { id: 'task-1', title: 'Take out the garbage' },
      'task-2': { id: 'task-2', title: 'Watch my favorite show' },
      'task-3': { id: 'task-3', title: 'Charge my phone' },
      'task-4': { id: 'task-4', title: 'Cook dinner' },
      'task-5': { id: 'task-5', title: 'Jaki piekny dzionek' },
      'task-6': { id: 'task-6', title: 'Uwazaj na niego' },
      'task-7': { id: 'task-7', title: 'To plonie uciekaj' },
      'task-8': { id: 'task-8', title: 'A obiad dzis byl o wiele za szybko moim skromnym zdaniem' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        name: 'To do',
        tasks_order: ['task-1', 'task-2', 'task-3', 'task-4']
      },
      'column-2': {
        id: 'column-2',
        name: 'In progress',
        tasks_order: ['task-5', 'task-6',]
      },
      'column-3': {
        id: 'column-3',
        name: 'Done',
        tasks_order: []
      },
      'column-4': {
        id: 'column-4',
        name: 'Pieknie',
        tasks_order: ['task-7', 'task-8',]
      },
      'column-5': {
        id: 'column-5',
        name: 'No nie bardzo',
        tasks_order: []
      },
      'column-6': {
        id: 'column-6',
        name: 'A jednka ?',
        tasks_order: []
      },
      'column-7': {
        id: 'column-7',
        name: 'Nie',
        tasks_order: []
      },
      'column-8': {
        id: 'column-8',
        name: 'AAAardzo',
        tasks_order: []
      },
      'column-9': {
        id: 'column-9',
        name: 'Cosoooso',
        tasks_order: []
      }
    },
    // Facilitate reordering of the columns
    column_order: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7', 'column-8', 'column-9']
  }
  
  export default initialData
  
  