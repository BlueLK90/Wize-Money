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
    <>
      <Tabs value="Pending" className="grid justify-center">
        <TabsHeader className="bg-gray-300 w-64">
          <Tab key={"Pending"} value="Pending">
            Pending
          </Tab>
          <Tab key={"Done"} value="Done">
            Done
          </Tab>
        </TabsHeader>
        <TabsBody className="">
          <TabPanel key={"Pending"} value="Pending">
            Pending
          </TabPanel>
          <TabPanel key={"Done"} value="Done">
            Done
          </TabPanel>
        </TabsBody>
      </Tabs>

      <Button onClick={toggleOpen}>Open Collapse</Button>
      <Collapse open={open}>
        <Card className="my-4 mx-auto w-8/12">
          <CardBody>
            <Typography>
              Use our Tailwind CSS collapse for your website. You can use if for
              accordion, collapsible items and much more.
            </Typography>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
};

export default Wishlist;
