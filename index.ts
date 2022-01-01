import { execSync } from "child_process";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";

const start = "2022-01-01";
const end = "2023-03-01";

const delta = dayjs(end).diff(start, "day");

(async () => {
  for (let i = 0; i < 1; i++) {
    const date = dayjs(start).add(i, "day").format("ddd MMM DD HH:mm:ss YYYY");
    console.log(date);
    fs.writeFileSync(path.join(__dirname, "readme.md"), `# ${date} days`);
    execSync(`git add .`, { stdio: "inherit" });
    execSync(`git commit -m '${date}'`, {
      stdio: "inherit",
      env: {
        GIT_AUTHOR_DATE: `${date} -0400`,
        GIT_COMMITTER_DATE: `${date} -0400`,
      },
    });
    execSync(`git push origin master`, { stdio: "inherit" });

    // GIT_AUTHOR_DATE='Fri Jul 26 19:32:10 2013 -0400' GIT_COMMITTER_DATE='Fri Jul 26 19:32:10 2013 -0400' git commit --amend -m test
  }
})();
