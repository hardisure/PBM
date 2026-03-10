import FailureCascadeDiagram from '../components/FailureCascadeDiagram'
import GovernanceCostCalculator from '../components/GovernanceCostCalculator'
import RootCauseSystemMap from '../components/RootCauseSystemMap'
import InnovationMethodologyDiagram from '../components/InnovationMethodologyDiagram'
import BPMNTransformation from '../components/BPMNTransformation'
import ArchitectureStack from '../components/ArchitectureStack'
import ProcessResilienceGauge from '../components/ProcessResilienceGauge'
import ImplementationComparison from '../components/ImplementationComparison'
import FinancialImpactChart from '../components/FinancialImpactChart'
import IndonesiaMarketMap from '../components/IndonesiaMarketMap'
import RiskMatrix from '../components/RiskMatrix'

export default function InnovationStory() {
    return (
        <>
            <FailureCascadeDiagram />
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--section-px)', marginTop: -40, marginBottom: 40 }}>
                <GovernanceCostCalculator />
            </div>
            <RootCauseSystemMap />
            <InnovationMethodologyDiagram />
            <BPMNTransformation />
            <ArchitectureStack />
            <ProcessResilienceGauge />
            <ImplementationComparison />
            <FinancialImpactChart />
            <IndonesiaMarketMap />
            <RiskMatrix />
        </>
    )
}
