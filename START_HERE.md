# Building a Network: String Lab

An offline network-building simulation for grades 9–12, designed for a 20–30 minute lesson. Use it on a classroom projector or distribute it to students for independent work.

## Open and share

1. Double-click **Building_a_Network.html**, or choose **Open with** and select your browser.
2. The entire simulation is in that one file. It needs no installation, account, server, or internet connection.
3. Share the HTML file through your learning platform, a shared drive, or a USB drive. Students should download it and open it in their browser. Learning platforms may display HTML as a preview or block scripts in their preview; download the file to run it.
4. If sharing the ZIP, students should extract it first, then open the HTML file.

The file works locally. It does not connect separate students' computers to one another or collect submissions. Students can submit their downloaded design and reflection files through your usual learning platform.

## Quick classroom setup

- Start with **6 devices** so the class can see the full network clearly. You can use 3–16 devices regardless of your actual class size.
- Keep **Teacher tools** on when demonstrating. Expand the teacher examples to load a full mesh, chain, star, ring, or ring with shortcuts.
- Turn **Teacher tools** off for independent challenges. This hides the examples and risk highlighting and locks the final challenge's targets.
- **Projector view** enlarges the network area and hides the written reflection and file controls. Click **Exit projector view** to return.
- Open **Lesson guide** inside the program for the complete activity sequence and vocabulary.

## The four challenges

| Challenge | Task | Discussion |
| --- | --- | --- |
| 1. Everyone, directly | Give every device a direct string to every other device. | Why does adding devices increase the number of strings so quickly? |
| 2. Less string | Keep everyone connected with the minimum number of strings. | What changes when messages use indirect paths? |
| 3. Survive a cut | Keep everyone connected after any individual string cut, using the minimum number of strings. | Where does the alternate path come from? |
| 4. Find a balance | Meet a string budget, survive a single cut, and limit the longest shortest path. | Which tradeoff would you accept, and why? |

The same network stays in place when you move between challenges. Students can revise it instead of starting over. **Clear strings** starts fresh. **Undo** restores a previous design.

## A 20–30 minute lesson

- **2–3 minutes:** Connect A–B, C–D, and E–F. Send from A to F. Ask why the message cannot arrive.
- **4 minutes:** Build direct connections for every pair in challenge 1.
- **4–5 minutes:** Remove strings while preserving communication in challenge 2. Compare a chain and star.
- **4–5 minutes:** Add alternate paths in challenge 3. Test a cut and repair between trials.
- **4–6 minutes:** Balance the three constraints in challenge 4. Compare a ring and a ring with shortcuts.
- **2–4 minutes:** Write and download the design reasoning.

For a 20-minute lesson, demonstrate challenges 1 and 2 together, then give students more time for challenges 3 and 4.

## Controls and measurements

**Connect:** Click or tap one device, then another. The pair gets one string. Selecting the same pair again removes the string. Each string joins exactly two devices. Crossing strings do not create junctions.

**Cut / repair:** Click a string to toggle its failure. Cut strings stay in the design and still count as paid for. **Repair all** restores them. String cuts model connection failures, not device failures.

**Test one string cut:** If a string is vulnerable, the program chooses a vulnerable string to make that weakness visible. Otherwise it chooses a working string. Repair between trials to test one failure at a time. Repeated cuts without repairs test multiple failures.

**Single-cut check:** The program also tests *every* working string individually. A risky string has no alternate path. Cutting it separates a connected network. If the current network is already disconnected, reconnect it before interpreting whole-network resilience.

**Send message:** Choose a sender and receiver. A message follows a shortest path through working strings. **One hop** advances it one connection at a time. The animation stops when you edit the network. People using a reduced-motion setting get a static delivered path instead of animation.

**Pairs that can communicate:** Counts unordered device pairs with a working path. With 6 devices there are 15 pairs. Full reachability does not require a direct string for every pair.

**Longest shortest path:** For each pair, find its shortest route. The displayed value is the largest of those hop counts. A disconnected network displays “No full path.”

**Classroom targets:** In challenge 4, the starting budget is n + 2 strings (capped by the number of possible pairs), the hop limit is 3, and every individual string cut must preserve communication. Teacher tools allow changing these targets. Some combinations are impossible. These numeric targets extend the presentation's open design challenge.

## Student work

- **Save design** downloads `Network_Design.json`: the current connections, failure states, device count, challenge, classroom targets, and all four reflections.
- **Open design** restores that file in another copy of the program. It replaces the current network and reflections. Save current work before opening a different design.
- **Download reflection** downloads `Network_Reflection.txt`, containing current network measurements and all four written responses.
- **Print** prints the current challenge, network, measurements, and current reflection. Use the text download to include all four reflections.
- Work is kept in the page while it stays open. Save before closing or refreshing the browser. The program does not automatically save or submit work.

## Teacher reference

For n devices:

- Everyone directly connected: **n(n − 1)/2** strings.
- Everyone connected with the minimum cost: **n − 1** strings. Any connected design with that many strings is a tree, so every string is vulnerable to a cut.
- Minimum cost while surviving any one string cut: **n** strings for n ≥ 3. A ring meets that minimum.

For 6 devices, the counts are **15**, **5**, and **6**. A star has at most 2 hops but loses connectivity after any string cut. A ring has at most 3 hops and survives any one string cut. A full mesh has 1-hop paths and high string cost.

The final challenge has no universal best answer. Its targets let the class compare concrete compromises. Passing a target does not prove a design is the best possible design under every criterion.

## Scope of the model

All strings have equal cost regardless of the drawn length. Links are bidirectional. Devices can relay messages. A central calculation chooses shortest-hop paths, without modeling routing protocols, packets competing for bandwidth, unequal latency, or device failures. Hops illustrate path length and do not measure actual speed or bandwidth.

The four challenge sequence and vocabulary follow the supplied **CSP The Internet – Lesson 02 – Building a Network** presentation, especially slides 6–10 and 14. The interactive program, adjustable challenge 4 targets, and reporting features are original extensions.

## Keyboard access

Tab to a device and press Enter or Space to select it. Select a second device the same way. In Cut / repair mode, Tab to a string and press Enter or Space to toggle it. Escape cancels device selection. All other controls use standard keyboard interaction.

