import React from 'react';

export function DisclaimerContent() {
    return (
        <div className="text-left"> {/* Or apply text-left to the parent in page.tsx */}
            <p className="mb-3">
                DrawdownCalc is designed to help you understand potential strategies for withdrawing funds throughout your retirement.
            </p>

            <h2 className="text-xl font-semibold mb-3">How DrawdownCalc Works</h2>
            <p className="mb-3">
                DrawdownCalc uses a mathematical modeling technique called mixed-integer linear programming to calculate drawdown plans. To make these calculations possible and provide you with results, the real world is necessarily represented through a simplified and predictable mathematical model.
            </p>
            <p className="mb-3">
                It&apos;s important to understand what this &quot;simplified and predictable&quot; nature means when you use DrawdownCalc:
            </p>
            <h3 className="text-base font-semibold mb-2">Simplified Rules for Complex Realities</h3>
            <p>Real-world financial systems, particularly tax laws, are incredibly intricate and subject to frequent change. DrawdownCalc employs simplified tax rules for several reasons:</p>
            <ul className="list-inside list-disc">
                <li className="pl-4">Feasibility: Some calculations would be too slow or computationally impossible in this type of mathematical model with fully detailed tax codes.</li>
                <li className="pl-4">Clarity: Simplification helps illustrate broader strategic trade-offs without getting lost in minute details that vary greatly person-to-person. While these simplified rules allow the tool to function and provide insights, they mean that tax calculations are approximations and cannot be comprehensive or reflect every nuance of current or future tax law.</li>
            </ul>
            <h3 className="text-base font-semibold mb-2">Predictable Inputs for an Unpredictable Future</h3>
            <p>The real world is anything but predictable. However, to calculate plans, DrawdownCalc will ask you to provide specific assumptions for factors that are inherently unknowable with certainty.</p>
            <ul className="list-inside list-disc">
            <li className="pl-4">For instance, you&apos;ll be asked to define a planning horizon or an &quot;end-of-plan&quot; date, a point in the future we all hope remains uncertain for a long time!</li>
            <li className="pl-4">Similarly, you&apos;ll input your predictions for future inflation and rates of return, which the model will treat as constant year after year. This is a significant simplification, as actual rates fluctuate. The value of this approach lies in being able to calculate plans based on your chosen, consistent set of assumptions, rather than trying to precisely predict an unknowable future.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-3">IMPORTANT DISCLAIMER</h2>
            <p className="mb-3">
                DrawdownCalc is an exploratory tool provided for informational and educational purposes only. The calculations and plans generated are based entirely on the assumptions you provide and the mathematical model outlined above.
            </p>
            <p className="mb-3">
                We strongly encourage you to consult with qualified and independent financial advisors, tax professionals, and legal experts before making any decisions regarding your finances or retirement. They can provide personalized advice tailored to your specific situation and current regulations.
            </p>
            <p className="mb-3">
                This website and its outputs should in no way be relied upon as financial, tax, investment, or retirement advice. The information provided does not constitute a recommendation of any particular strategy or financial plan.
            </p>
        </div>
    );
}