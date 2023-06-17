import { Cv } from '~/components/cv';
import { db } from '~/db';
import {
  dbPass,
  dbUser,
} from '~/db/config';

async function App() {
  await db.signin({
    user: dbUser,
    pass: dbPass,
  });

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-50">
      <Cv />
    </div>
  );
}

export default App;
