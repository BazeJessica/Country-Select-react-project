import { and, rankWith, scopeEndsWith } from '@jsonforms/core';

  // eslint-disable-next-line react-refresh/only-export-components
  export default rankWith(
    3,
    and(
      scopeEndsWith('conti'),
    )
  );