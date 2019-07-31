const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
      'task-5': { id: 'task-5', content: 'Jaki piekny dzionek' },
      'task-6': { id: 'task-6', content: 'Uwazaj na niego' },
      'task-7': { id: 'task-7', content: 'To plonie uciekaj' },
      'task-8': { id: 'task-8', content: 'A obiad dzis byl o wiele za szybko moim skromnym zdaniem' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: ['task-5', 'task-6',]
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: []
      },
      'column-4': {
        id: 'column-4',
        title: 'Pieknie',
        taskIds: ['task-7', 'task-8',]
      },
      'column-5': {
        id: 'column-5',
        title: 'No nie bardzo',
        taskIds: []
      },
      'column-6': {
        id: 'column-6',
        title: 'A jednka ?',
        taskIds: []
      },
      'column-7': {
        id: 'column-7',
        title: 'Nie',
        taskIds: []
      },
      'column-8': {
        id: 'column-8',
        title: 'AAAardzo',
        taskIds: []
      },
      'column-9': {
        id: 'column-9',
        title: 'Cosoooso',
        taskIds: []
      }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7', 'column-8', 'column-9']
  }
  
  export default initialData
  
  