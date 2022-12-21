
interface Props {
    isFormLoading: boolean
    signupResult: string|undefined
  }

export default function SignupResult(props: Props) {
    if (props.isFormLoading) {
        return  (
            <div>Loading...</div>
      )} else { return  (
            <div>
                {props.signupResult}
            </div>
  )}
}