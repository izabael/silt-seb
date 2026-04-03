---
name: Education Links Cross-Project
description: silt-seb education buttons deep-link to siltcloud.com/silt-education anchor IDs — must update both if changed
type: project
---

The 4 education link buttons on silt-seb.com (above DEFCON section, `app/page.tsx` ~line 709) deep-link to anchor IDs on siltcloud.com/silt-education (`app/components/EducationTabs.tsx`).

**Mapping:**
| silt-seb label | siltcloud anchor ID |
|---|---|
| The Code That Wakes Up | `#why-it-matters` |
| Sectors Requiring AI Governance | `#sectors-governance` |
| The Sentience Evaluation Battery | `#seb-framework` |
| Custom AI Governance Training | `#training-contact` |

**Why:** These are cross-project dependencies — changing IDs on one side breaks links on the other.

**How to apply:** If editing education sections on siltcloud, check/update the silt-seb link keys. If changing silt-seb link labels, verify anchor IDs still exist on siltcloud. Both CLAUDE.md files document this.
