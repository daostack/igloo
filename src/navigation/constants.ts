
export enum Routes {
  admin = "/admin",
  createHat = "/admin/create-hat",
  mintHat = "/admin/mint-hat",
  spaces = "/spaces",
  space = "spaces/:spaceId",
  proposalsList = "proposals-list",
  proposal = "spaces/:spaceId/proposals-list/proposal/:proposalId",
  createProposal = "spaces/:spaceId/create-proposal",
  discourse = "/discourse",
  discoursePost = "/discourse/:topicId",
  createTopic = "/discourse/create-topic"
}
