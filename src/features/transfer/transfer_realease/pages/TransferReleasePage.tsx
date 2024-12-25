import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddReleasePeriodModal from "../component/AddReleasePeriodModal";
import GeneralRelease from "../component/GeneralRelease";
import ReleasePeriodsTable from "../component/ReleasePeriodsTable";
import ReleasePeriodsSection from "../component/ReleasePeriodsSection"

const TransferReleasePage: React.FC = () => {

  
    return (
      <Container className="my-4">
        <Stack gap={4}>
          <GeneralRelease

          />
          <ReleasePeriodsSection/>
        </Stack>


      </Container>
    );
}

export default TransferReleasePage;