
interface TabPanelProps {
  tabId: string,
  selectedId: string,
}

const TabPanel: React.FC<TabPanelProps> = ({tabId, selectedId}) => {

  return (
    <div
      role='tabPanel'
      hidden={tabId !== selectedId}
    >
      {`Hello world ${tabId}`}
    </div>
  )
}

export default TabPanel;