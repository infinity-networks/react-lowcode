import { Tabs } from "@arco-design/web-react";
import Effects from "./Design/components/Effects";
import Fill from "./Design/components/Fill";
import Stroke from "./Design/components/Stroke";

const TabPane = Tabs.TabPane;

export default function () {
  return (
    <div>
      <Tabs>
        <TabPane key={"0"} title="设计">
          <Effects />
          <Fill />
          <Stroke />
        </TabPane>
        <TabPane key={"1"} title="原型"></TabPane>
      </Tabs>
    </div>
  );
}
