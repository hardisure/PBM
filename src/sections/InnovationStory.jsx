import FailureCascadeDiagram from '../components/FailureCascadeDiagram'
import GovernanceCostCalculator from '../components/GovernanceCostCalculator'
import RootCauseSystemMap from '../components/RootCauseSystemMap'
import InnovationMethodologyDiagram from '../components/InnovationMethodologyDiagram'
import CaseStudyMKP from '../components/CaseStudyMKP'
import BPMNTransformation from '../components/BPMNTransformation'
import ArchitectureStack from '../components/ArchitectureStack'
import DecouplingLayerVisual from '../components/DecouplingLayerVisual'
import ProcessResilienceGauge from '../components/ProcessResilienceGauge'
import ImplementationComparison from '../components/ImplementationComparison'
import NonFinancialBenefits from '../components/NonFinancialBenefits'
import FinancialImpactChart from '../components/FinancialImpactChart'
import ROIPerPackage from '../components/ROIPerPackage'
import SWOTAnalysis from '../components/SWOTAnalysis'
import PESTLEAnalysis from '../components/PESTLEAnalysis'
import PortersFiveForces from '../components/PortersFiveForces'
import CompetitorLandscape from '../components/CompetitorLandscape'
import BusinessModelCanvas from '../components/BusinessModelCanvas'
import IndonesiaMarketMap from '../components/IndonesiaMarketMap'
import ClientSuccessProjection from '../components/ClientSuccessProjection'
import CommercializationRoadmap from '../components/CommercializationRoadmap'
import PatentHAKIBadge from '../components/PatentHAKIBadge'
import RiskMatrix from '../components/RiskMatrix'

export default function InnovationStory() {
    return (
        <>
            {/* === SECTION 1: PROBLEM IDENTIFICATION === */}
            <FailureCascadeDiagram />
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--section-px)', marginTop: -40, marginBottom: 40 }}>
                <GovernanceCostCalculator />
            </div>
            <RootCauseSystemMap />

            {/* === SECTION 2: METHODOLOGY & CASE STUDY === */}
            <InnovationMethodologyDiagram />
            <CaseStudyMKP />

            {/* === SECTION 3: THE INNOVATION (SOLUTION) === */}
            <BPMNTransformation />
            <ArchitectureStack />
            <DecouplingLayerVisual />
            <ProcessResilienceGauge />

            {/* === SECTION 4: EVIDENCE & IMPACT === */}
            <ImplementationComparison />
            <NonFinancialBenefits />
            <FinancialImpactChart />
            <ROIPerPackage />

            {/* === SECTION 5: STRATEGIC ANALYSIS === */}
            <SWOTAnalysis />
            <PESTLEAnalysis />
            <PortersFiveForces />
            <CompetitorLandscape />

            {/* === SECTION 6: BUSINESS MODEL & MARKET === */}
            <BusinessModelCanvas />
            <IndonesiaMarketMap />
            <ClientSuccessProjection />

            {/* === SECTION 7: COMMERCIALIZATION & COMPLIANCE === */}
            <CommercializationRoadmap />
            <PatentHAKIBadge />
            <RiskMatrix />
        </>
    )
}
