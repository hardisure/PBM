import ProblemReminder from '../components/ProblemReminder'
import SolutionOverview from '../components/SolutionOverview'
import BPMNSimulationDemo from '../components/BPMNSimulationDemo'
import ImplementationTimeline from '../components/ImplementationTimeline'
import ROISimulator from '../components/ROISimulator'
import WhoIsThisFor from '../components/WhoIsThisFor'
import Pricing from '../components/Pricing'
import OrgCapabilityToolkit from '../components/OrgCapabilityToolkit'

export default function ProductStory() {
    return (
        <>
            <ProblemReminder />
            <SolutionOverview />
            <BPMNSimulationDemo />
            <ImplementationTimeline />
            <ROISimulator />
            <WhoIsThisFor />
            <Pricing />
            <OrgCapabilityToolkit />
        </>
    )
}
