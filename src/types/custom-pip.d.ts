declare namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'msc-any-pip': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          winwidth?: string | number;
          winheight?: string | number;
          dismisswhenbacktoopener?: boolean;
        };
      }
    }
  }
  