
import { getSegments } from "_actions/segments";

import SegmentsTable from "_components/segments/segmentstable";

export default function Segments() {
  let segments = getSegments();
  return (
    <main>
      <SegmentsTable data={segments} />
    </main>
  );
}