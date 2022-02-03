import React, { ReactElement, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { explainableAIData } from '../../api/mockdataTransformer';
import Graph, { GraphData } from '../../components/graph/Graph';
import { TableWidget } from "../../components/widgets/table/TableWidget";
import { Column } from "react-table";
import { FileData } from "../files/Files";
import { TableMockData } from "../../utils/TableMockData";
import Button from "../../components/form/Button";
import Modal from "../../components/modal/Modal";
import BilanzkreisSelection from "../../components/modal/BilanzkreisSelection";
import useWindowDimensions from '../../services/window-dimensions';
import { useStore } from '../../store/Store';

function Home(): ReactElement {
    const styles = {
        container: 'w-full h-full p-6 flex gap-6 ',
        card: 'shadow-card h-full bg-grayscale-light rounded-[8px] ',
        option: 'flex h-full flex-col justify-center items-center',
        logo: 'self-center'
    };

    const { width } = useWindowDimensions();

    const [exampleFiles, setExampleFiles] = useState(TableMockData());
    const [exampleData, setExampleData] = useState<GraphData[]>([])

    const [selectedBilanzKreis] = useStore(state => [state.selectedBilanzKreis]);
    const [isSelectionOpen, setIsSelectionOpen] = useStore(state => [state.selectionModalOpen, state.setSelectionModalOpen]);

    useAsyncEffect(async (isMounted) => {
        const aiData: GraphData[] = await explainableAIData();

        if (!isMounted) return;
        setExampleData(aiData);
    }, []);

    const columns: Column<FileData>[] = [
        {
            Header: "Name",
            accessor: "fileName",
        },
    ]


    return <div className="h-full">
        {
            selectedBilanzKreis === ('' || undefined) ?
                <div className={styles.option}>
                    <img src="/welcome_logo.png" className={styles.logo}></img>
                    <p className="my-5"> Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können</p>
                    <Button variant="primary" onClick={() => {
                        setIsSelectionOpen(true)
                    }}>
                        Bilanzkreis wählen
                    </Button>
                </div>
                :
                <div className={styles.container}>
                    {width > 1200 ? (
                        <>
                            <div className={styles.card + 'w-2/3'}>
                                <Graph data={exampleData} header={selectedBilanzKreis + " Graph"} group={selectedBilanzKreis} />
                            </div>
                            <div className="w-1/3 h-full flex flex-col gap-6">
                                <div className={styles.card}>
                                    <TableWidget columns={columns} data={exampleFiles} changeData={setExampleFiles} variant={"long"} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.card + 'w-full'}>
                            <Graph data={exampleData} header={selectedBilanzKreis + " Graph"} group={selectedBilanzKreis} />
                        </div>
                    )}
                </div>
        }
        <Modal isOpen={isSelectionOpen} title={"Bilanzkreise auswählen"}
            onClose={() => setIsSelectionOpen(false)}>
            <BilanzkreisSelection setModalOpen={setIsSelectionOpen}></BilanzkreisSelection>
        </Modal>
    </div>


}

export default Home;
