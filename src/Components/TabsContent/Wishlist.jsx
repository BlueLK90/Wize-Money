import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const Wishlist = () => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="max-w-[450px]">
      <Tabs value="Pending" className="">
        <div>
          <TabsHeader className="bg-gray-300 w-64">
            <Tab key={"Pending"} value="Pending">
              Pending
            </Tab>
            <Tab key={"Done"} value="Done">
              Done
            </Tab>
          </TabsHeader>
        </div>
        <div>
          <TabsBody className="">
            <TabPanel key={"Pending"} value="Pending">
              <p>Pending</p>
              <div
                onClick={toggleOpen}
                className="border border-gray-400 bg-gray-100 w-full rounded-md p-2"
              >
                Open Collapse
                <Collapse open={open}>
                  <Card className="w-full rounded-tl-none rounded-tr-none">
                    <CardBody className="p-2 rounded-tl-none">
                      <div>
                        Use our Tailwind CSS collapse for your website. You can
                        use if for accordion, collapsible items and much more
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            </TabPanel>
            <TabPanel key={"Done"} value="Done">
              Done
            </TabPanel>
          </TabsBody>
        </div>
      </Tabs>
    </div>
  );
};

export default Wishlist;
