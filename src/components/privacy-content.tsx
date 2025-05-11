import React from 'react';

export function PrivacyContent() {
  return (
    <div className="text-left">
      <p className="mb-3">
        DrawdownCalc uses the information from your form to calculate your drawdown plan.
      </p>
      <p className="mb-3">
        DrawdownCalc does not log any of the information from your form.
      </p>
      <p className="mb-3">
        DrawdownCalc does not store any of the information from your form in a database.
      </p>
      <p className="mb-3">
        The next time you visit DrawdownCalc you will need to fill out the form again.
      </p>
      <p className="mb-3">
        If DrawdownCalc adds a “Remember Me” option or similar functionality in the future it will be opt-in; that is, the user will have to check a box or press a button to allow DrawdownCalc to store their information. In that case the information on this page will be updated.
      </p>
    </div>
  );
}