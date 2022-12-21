import SignCard from '../../components/common/sing-card'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
interface Props {
    isSigned: boolean;
  }

export default function ProtectedContent(props: Props) {
    return  (
    <div className={styles.grid}>
          <Link
            href="signup"
            className={styles.card}
          >
            <h2>
              Sign up <span>-&gt;</span>
            </h2>
            <p>
              Give me new account.
            </p>
          </Link>
          <SignCard isSigned={props.isSigned}/>
          
          <Link
            href="/protected"
            className={styles.card}

          >
            <h2 >
              Protected page <span>-&gt;</span>
            </h2>
            <p >
              Not for all eyes.
            </p>
          </Link>
</div>
    )
}