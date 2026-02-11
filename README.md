# UK EPC Rating Checker & Energy Savings Estimator

A free tool to look up your home's Energy Performance Certificate (EPC) rating and estimate potential savings from energy efficiency improvements.

## 🏠 What This Does

- Looks up any UK property's EPC rating using the official [EPC Register API](https://epc.opendatacommunities.org/)
- Estimates annual energy costs based on your rating
- Shows potential savings from improvements (insulation, heating upgrades, solar)
- Identifies which [government grants](https://greatbritishenergy.com/government-grants/) you may be eligible for

## 📊 EPC Ratings Explained

| Rating | Band | Typical Annual Cost | Common Improvements |
|--------|------|-------------------|-------------------|
| 92-100 | A | £500-£700 | Already optimal |
| 81-91 | B | £700-£1,000 | Minor improvements |
| 69-80 | C | £1,000-£1,400 | [Solar panels](https://greatbritishenergy.com/solar-panel-grants/), smart controls |
| 55-68 | D | £1,400-£1,800 | [Loft insulation](https://greatbritishenergy.com/loft-insulation-grant/), [cavity wall](https://greatbritishenergy.com/cavity-wall-insulation-grant/) |
| 39-54 | E | £1,800-£2,400 | [ECO4 eligible](https://greatbritishenergy.com/eco4-scheme/) — full insulation + heating |
| 21-38 | F | £2,400-£3,200 | [ECO4 eligible](https://greatbritishenergy.com/eco4-scheme/) — major works needed |
| 1-20 | G | £3,200+ | [ECO4 eligible](https://greatbritishenergy.com/eco4-scheme/) — urgent improvements |

> Homes rated D-G qualify for [free improvements under ECO4](https://greatbritishenergy.com/eco4-scheme/) if the occupant receives qualifying benefits.

## 🔧 Usage

```bash
# Install
npm install uk-epc-checker

# Look up an EPC
npx epc-lookup "1 Example Street, London, SW1A 1AA"
```

### API Usage

```javascript
const { lookupEPC, estimateSavings } = require('uk-epc-checker');

// Look up a property
const epc = await lookupEPC({ postcode: 'SW1A 1AA', address: '1 Example Street' });
console.log(epc.rating); // 'D'
console.log(epc.score);  // 62

// Estimate savings from improvements
const savings = estimateSavings(epc, {
  loftInsulation: true,
  cavityWall: true,
  solarPanels: false
});
console.log(savings.annualSaving);    // £680
console.log(savings.newRating);       // 'C'
console.log(savings.eligibleGrants);  // ['ECO4', 'GBIS']
```

## 💰 Grant Eligibility

Based on your EPC rating and circumstances, you may qualify for:

### [ECO4 Scheme](https://greatbritishenergy.com/eco4-scheme/) — Up to £15,000 Free
- EPC rating D, E, F, or G
- Receiving qualifying benefits (Universal Credit, Pension Credit, etc.)
- Covers: insulation, boilers, heat pumps, solar panels

### [Great British Insulation Scheme](https://greatbritishenergy.com/gbis/) — Free Insulation
- Council tax bands A-D (no benefits required)
- **Closing March 2026**
- Covers: cavity wall and loft insulation

### [Boiler Upgrade Scheme](https://greatbritishenergy.com/boiler-upgrade-scheme/) — £7,500 Grant
- Any homeowner in England/Wales
- No income or EPC requirement
- Covers: heat pump installation

**Check your full eligibility:** [Great British Energy Eligibility Checker](https://greatbritishenergy.com/eligibility-checker/)

## 📈 How Improvements Affect Value

| Improvement | Cost (Private) | Cost (Grant) | EPC Uplift | Annual Saving |
|------------|---------------|-------------|------------|---------------|
| Loft insulation | £1,000-£2,500 | [Free (GBIS/ECO4)](https://greatbritishenergy.com/loft-insulation-grant/) | +5-15 points | £150-£350 |
| Cavity wall insulation | £2,000-£4,000 | [Free (GBIS/ECO4)](https://greatbritishenergy.com/cavity-wall-insulation-grant/) | +10-20 points | £200-£400 |
| External wall insulation | £6,000-£15,000 | [Free (ECO4)](https://greatbritishenergy.com/eco4-scheme/) | +15-30 points | £300-£600 |
| Boiler replacement | £2,500-£4,500 | [Free (ECO4)](https://greatbritishenergy.com/eco4-scheme/) | +5-10 points | £100-£300 |
| Heat pump | £10,000-£15,000 | [£7,500 grant (BUS)](https://greatbritishenergy.com/boiler-upgrade-scheme/) | +10-20 points | £200-£500 |
| Solar panels | £5,000-£8,000 | [Free (ECO4)](https://greatbritishenergy.com/solar-panel-grants/) | +5-15 points | £300-£800 |

## Data Sources

- [EPC Open Data](https://epc.opendatacommunities.org/) — Official EPC register
- [Ofgem](https://www.ofgem.gov.uk/) — Energy price caps
- [Great British Energy](https://greatbritishenergy.com/) — Grant eligibility and scheme details
- [BEIS](https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero) — Policy data

## License

MIT

## Contributing

PRs welcome. If you find this useful, star the repo and share it.

---

*Built to help UK homeowners understand their energy efficiency options. Not affiliated with any government body.*
