import { useQuery } from "@apollo/client";
import { StepProps } from "../../types";
import { GET_PROPOSAL } from "./graphql";
import { Params } from "./step";

export const StepComponent = (props: StepProps<Params>): JSX.Element => {
  const { data: { proposal } = {}, error: proposalError, loading: proposalLoading } = useQuery(GET_PROPOSAL,
    { variables: { proposalId: props.params?.proposalId }, context: { clientName: 1 } }); // Need to move apollo context to Core.

  if (proposalLoading) return <span>Loading...</span>;
  if (proposalError) return <span>Error loading proposal</span>;

  return (
    <div>
      <h3>{proposal.title}</h3>
    </div>
  )
}
