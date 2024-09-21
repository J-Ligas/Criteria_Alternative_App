import Chart from "@/components/Chart";
import CombinedTable from "@/components/CombinedTable";
import { _skillsData, playerData } from "@/data/skill";

export default function Home() {
  return (
    <div>
      <Chart skillsData={_skillsData} firstColumnLabel="Criteria" />
      <Chart skillsData={playerData} firstColumnLabel="Alternatives" />
      <CombinedTable
        skillsData1={_skillsData}
        firstColumnLabel1="Criteria"
        firstColumnLabel2="Alternatives"
      />
    </div>
  );
}
