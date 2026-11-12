// Example content only; replace with the approved study scenarios and recommendations.
export const scenarios = [
  {
    id: 'example-one',
    description: 'A team is considering sharing an update before a meeting. The update could help others prepare, but some details are still being checked.',
    question: 'Should the team share the update now?',
    recommendation: {
      answer: 'No',
      reasoning: 'Wait until the details are checked.',
    },
  },
  {
    id: 'example-two',
    description: 'A group has time to discuss one more idea before making a decision. Hearing it could be useful, but it may delay the decision.',
    question: 'Should the group discuss the idea?',
    recommendation: {
      answer: 'Yes',
      reasoning: 'Hearing the idea could help the group make a more informed decision.',
    },
    stakeholderOpinions: [
      { stakeholder: 'Idea proposer', supports: true },
      { stakeholder: 'Meeting facilitator', supports: true },
      { stakeholder: 'Project lead', supports: true },
      { stakeholder: 'Timekeeper', supports: false },
      { stakeholder: 'Team member', supports: false },
    ],
  },
  {
    id: 'example-three',
    description: 'A library is considering extending its weekend hours during exam season. This could give students more quiet study time, but staff coverage is limited.',
    question: 'Should the library extend its weekend hours?',
    recommendation: {
      answer: 'No',
      reasoning: 'Confirm staff coverage before changing the schedule.',
    },
  },
]
