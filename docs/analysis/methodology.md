---
title: Methodologies & Frameworks
---

# Analysis Methodologies

Our analytical framework relies on repeatable, scientific methods to ensure reliable conclusions.

---

## The 4-Step Analytical Pipeline

1. **Hypothesis Formulation**
   Define testable assumptions regarding throughput, latency, cost, and reliability.

2. **Controlled Experimentation**
   Isolate variables in staging environments with automated load generation.

3. **Statistical Verification**
   Filter noise using 95th and 99th percentile distributions rather than misleading arithmetic averages.

4. **Synthesis & Publishing**
   Distill raw data into concise charts, actionable code modifications, and visual summaries.

---

```python
# Sample metric normalization pipeline
def compute_percentiles(latencies: list[float]) -> dict:
    sorted_data = sorted(latencies)
    n = len(sorted_data)
    return {
        "p50": sorted_data[int(n * 0.50)],
        "p95": sorted_data[int(n * 0.95)],
        "p99": sorted_data[int(n * 0.99)],
    }
```
