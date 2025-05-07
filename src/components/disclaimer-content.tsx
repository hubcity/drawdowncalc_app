import React from 'react';

export function DisclaimerContent() {
    return (
        <div className="text-left"> {/* Or apply text-left to the parent in page.tsx */}
           <h2 className="text-xl font-semibold mb-3">Welcome to DrawdownCalc!</h2>
            <p className="mb-3">
                DrawdownCalc is designed to help you explore and understand potential strategies for withdrawing funds throughout your retirement years. By inputting various assumptions, you can model different financial scenarios and see how they might unfold over time, giving you insights into the long-term impact of your choices.
            </p>

            <h3 className="text-lg font-semibold mb-2">How DrawdownCalc Works & Understanding Its Approach</h3>
            <p className="mb-3">
                At its core, DrawdownCalc utilizes a sophisticated mathematical modeling technique known as mixed-integer linear programming to analyze these complex scenarios. To make these calculations possible and provide you with results, the real world is necessarily represented through a simplified and predictable mathematical model.
            </p>
            <p className="mb-3">
                It&apos;s important to understand what this &quot;simplified and predictable&quot; nature means when you use DrawdownCalc:
            </p>
            <ul className="list-disc list-inside mb-3 space-y-1">
                <li>
                    <strong>Predictable Inputs for an Unpredictable Future:</strong> The real world is anything but simple or predictable. However, to explore potential outcomes, DrawdownCalc will ask you to provide specific assumptions for factors that are inherently unknowable with certainty.
                    <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                        <li>For instance, you&apos;ll be asked to define a planning horizon or an &quot;end-of-plan&quot; date – a point in the future we all hope remains uncertain for a long time!</li>
                        <li>Similarly, you&apos;ll input your predictions for future inflation and rates of return, which the model will treat as constant year after year. This is a significant simplification, as actual rates fluctuate. The value of this approach lies in understanding potential outcomes based on your chosen, consistent set of assumptions, rather than trying to precisely predict an unknowable future.</li>
                    </ul>
                </li>
                <li>
                    <strong>Simplified Rules for Complex Realities:</strong> Real-world financial systems, particularly tax laws, are incredibly intricate and subject to frequent change. DrawdownCalc employs simplified tax rules for several reasons:
                    <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                        <li>Feasibility: Some calculations would be too slow or computationally impossible with fully detailed tax codes.</li>
                        <li>Clarity: Simplification helps illustrate broader strategic trade-offs without getting lost in minute details that vary greatly person-to-person. While these simplified rules allow the tool to function and provide insights, they mean that tax calculations are approximations and cannot be comprehensive or reflect every nuance of current or future tax law.</li>
                    </ul>
                </li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Using DrawdownCalc Wisely</h3>
            <p className="mb-3">
                By understanding these inherent simplifications, DrawdownCalc can be a powerful tool for your retirement thinking. It allows you to run &quot;what-if&quot; scenarios, compare different withdrawal strategies, and see how various assumptions can influence your long-term financial picture.
            </p>

            <h3 className="text-lg font-semibold mb-2 text-red-600">--- IMPORTANT DISCLAIMER ---</h3>
            <p className="mb-3">
                DrawdownCalc is an exploratory tool provided for informational and educational purposes only. The calculations and scenarios generated are based entirely on the assumptions you provide and the simplified mathematical model described above.
            </p>
            <p className="mb-3">
                This website and its outputs should in no way be relied upon as financial, tax, investment, or retirement advice. The information provided does not constitute a recommendation of any particular strategy or financial plan.
            </p>
            <p className="mb-3">
                We strongly encourage you to consult with qualified and independent financial advisors, tax professionals, and legal experts before making any decisions regarding your finances or retirement. They can provide personalized advice tailored to your specific situation and current regulations.
            </p>
            <p>
                By proceeding, you acknowledge these limitations and agree to use DrawdownCalc as an educational tool for exploring possibilities, not as a source of definitive advice.
            </p>
        </div>
    );
}