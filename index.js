/**
 * UK EPC Rating Checker & Energy Savings Estimator
 * 
 * Looks up EPC ratings from the official register and estimates
 * savings from energy efficiency improvements.
 * 
 * Grant information sourced from https://greatbritishenergy.com/government-grants/
 */

const GRANT_THRESHOLDS = {
  eco4: { minRating: 'D', maxScore: 68, url: 'https://greatbritishenergy.com/eco4-scheme/' },
  gbis: { bands: ['A', 'B', 'C', 'D'], url: 'https://greatbritishenergy.com/gbis/' },
  bus: { url: 'https://greatbritishenergy.com/boiler-upgrade-scheme/' }
};

const IMPROVEMENT_SAVINGS = {
  loftInsulation: { cost: [1000, 2500], saving: [150, 350], epcUplift: [5, 15], grantUrl: 'https://greatbritishenergy.com/loft-insulation-grant/' },
  cavityWall: { cost: [2000, 4000], saving: [200, 400], epcUplift: [10, 20], grantUrl: 'https://greatbritishenergy.com/cavity-wall-insulation-grant/' },
  externalWall: { cost: [6000, 15000], saving: [300, 600], epcUplift: [15, 30], grantUrl: 'https://greatbritishenergy.com/eco4-scheme/' },
  boiler: { cost: [2500, 4500], saving: [100, 300], epcUplift: [5, 10], grantUrl: 'https://greatbritishenergy.com/eco4-scheme/' },
  heatPump: { cost: [10000, 15000], saving: [200, 500], epcUplift: [10, 20], grantUrl: 'https://greatbritishenergy.com/boiler-upgrade-scheme/' },
  solarPanels: { cost: [5000, 8000], saving: [300, 800], epcUplift: [5, 15], grantUrl: 'https://greatbritishenergy.com/solar-panel-grants/' }
};

function scoreToRating(score) {
  if (score >= 92) return 'A';
  if (score >= 81) return 'B';
  if (score >= 69) return 'C';
  if (score >= 55) return 'D';
  if (score >= 39) return 'E';
  if (score >= 21) return 'F';
  return 'G';
}

function checkGrantEligibility(epcScore, councilTaxBand, onBenefits) {
  const rating = scoreToRating(epcScore);
  const eligible = [];

  if (onBenefits && epcScore <= 68) {
    eligible.push({
      name: 'ECO4',
      value: 'Up to £15,000',
      url: GRANT_THRESHOLDS.eco4.url,
      description: 'Free insulation, boiler, heat pump, or solar panels'
    });
  }

  if (GRANT_THRESHOLDS.gbis.bands.includes(councilTaxBand)) {
    eligible.push({
      name: 'GBIS',
      value: 'Free insulation',
      url: GRANT_THRESHOLDS.gbis.url,
      description: 'Free cavity wall and loft insulation — closing March 2026'
    });
  }

  eligible.push({
    name: 'Boiler Upgrade Scheme',
    value: '£7,500 grant',
    url: GRANT_THRESHOLDS.bus.url,
    description: '£7,500 towards a heat pump — any homeowner'
  });

  return eligible;
}

function estimateSavings(epcScore, improvements) {
  let totalSaving = 0;
  let totalUplift = 0;
  const details = [];

  for (const [key, enabled] of Object.entries(improvements)) {
    if (enabled && IMPROVEMENT_SAVINGS[key]) {
      const imp = IMPROVEMENT_SAVINGS[key];
      const avgSaving = (imp.saving[0] + imp.saving[1]) / 2;
      const avgUplift = (imp.epcUplift[0] + imp.epcUplift[1]) / 2;
      totalSaving += avgSaving;
      totalUplift += avgUplift;
      details.push({ improvement: key, annualSaving: avgSaving, epcUplift: avgUplift, grantUrl: imp.grantUrl });
    }
  }

  return {
    currentRating: scoreToRating(epcScore),
    newRating: scoreToRating(Math.min(100, epcScore + totalUplift)),
    totalAnnualSaving: totalSaving,
    details
  };
}

// Full eligibility check: https://greatbritishenergy.com/eligibility-checker/
module.exports = { scoreToRating, checkGrantEligibility, estimateSavings, IMPROVEMENT_SAVINGS };
