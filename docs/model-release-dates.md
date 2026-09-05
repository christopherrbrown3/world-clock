# Model release dates

Verified against vendor launch announcements and release notes on **September 5, 2026**. These dates describe the model launch or public rollout used for the directory, not the date a World Clock rendition was made. A rollout date does not imply that every account, region, or API had access that day.

| Repository model label | Release date | Official evidence |
| --- | --- | --- |
| Codex Astra | 2026-09-03 | [OpenAI’s launch safety overview](https://openai.com/index/safety-overview-gpt-6-astra/) is dated September 3 and states that GPT-6 Astra is being released that day. |
| Gemini 3.8 Flash | 2026-09-02 | [Google’s launch announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) is dated September 2. |
| Claude Fable 5.1 | 2026-09-01 | [Claude release notes](https://support.claude.com/en/articles/12138966-release-notes) explicitly place the Fable 5.1 launch under September 1. |
| Claude Opus 5 | 2026-07-24 | [Anthropic’s announcement](https://www.anthropic.com/news/claude-opus-5) is dated July 24 and says the model is available that day. |
| Codex 5.6 Sol | 2026-07-09 | [OpenAI’s GPT-5.6 launch](https://openai.com/index/gpt-5-6/) dates general availability of Sol, Terra, and Luna to July 9, following a limited preview. |
| Codex 5.6 Terra | 2026-07-09 | [The same GPT-5.6 launch](https://openai.com/index/gpt-5-6/) includes Terra. Sol stays ahead of Terra for this tied date. |
| Grok 4.5 | 2026-07-08 | [xAI API release notes](https://docs.x.ai/developers/release-notes) state availability under July 8. See the date discrepancy below. |
| Claude Fable 5 | 2026-06-09 | [Anthropic’s original announcement](https://www.anthropic.com/news/claude-fable-5-mythos-5) is dated June 9. Its later July 1 redeployment is a separate event. |
| Claude Opus 4.8 | 2026-05-28 | [Anthropic’s announcement](https://www.anthropic.com/news/claude-opus-4-8) is dated May 28 and says it is available that day. |
| Codex 5.5 | 2026-04-23 | [OpenAI’s launch announcement](https://openai.com/index/introducing-gpt-5-5/) dates the ChatGPT/Codex rollout to April 23. Its April 24 API update is a separate event. |

## Rollout and source distinctions

- **Astra:** September 3 is the launch/rollout date. The [launch post](https://openai.com/index/gpt-6-astra/) describes initial access for a limited set of organizations and broader availability over the following days. September 5 is this repository’s Astra snapshot date, not its model release date.
- **Fable 5.1:** September 1 is explicit in the vendor’s release notes. The [announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1) displays September 2026; its reference to August 2 concerns EU AI Act watermarking requirements, not this model’s launch. The previous directory incorrectly used August 2.
- **Grok 4.5:** the [announcement page](https://x.ai/news/grok-4-5) currently carries July 16, while the official API release notes explicitly report availability on July 8 and EU API availability on July 17. The directory uses the earlier documented API release, July 8, rather than substituting the later blog date.
- **GPT-5.6:** the directory uses the July 9 family launch/general-availability announcement rather than its preceding limited preview. Repository labels use “Codex” for these renditions; the official model names use “GPT.”

## Maintaining the dates

Keep the index and README in descending release-date order, preserving existing ordering for ties. Check the vendor’s release entry when adding or changing a date; distinguish announcement, preview, rollout, regional availability, and later redeployment dates. Record the source and any ambiguity here.

Keep `snapshotDate` values in [versions.json](../versions.json) unchanged when correcting model release dates. Those values describe this project’s checkpoints and must not be overwritten with vendor launch dates.
