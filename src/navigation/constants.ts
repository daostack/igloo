
export enum Routes {
  admin = "/admin",
  createHat = "/admin/create-hat",
  mintHat = "/admin/mint-hat",
  spaces = "/spaces",
  space = "spaces/:spaceId",
  proposal = "spaces/:spaceId/proposal/:proposalId",
  createProposal = "spaces/:spaceId/create-proposal",
  discourse = "/discourse",
  discoursePost = "/discourse/:topicId",
  createTopic = "/discourse/create-topic"
}
