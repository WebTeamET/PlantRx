========== Component Making RULES ========
1) in this project when you make new component add it in /client folder's src folder. 

2) Always add the content and images dynamically via storing the json in variable do not put it static content.

========== Animation RULES ========

1) for the animations use framer motion. I have already installed it and made the neccessary variants in the framerMotionVariants.tsx file in the /client folder. 

2) for the new animations that has not been added in the variants file add in the component itself.

========== HTML RULES ========


1) Do not apply any classes directly on the body, html, header, or footer tags. These elements should remain clean and without class attributes, and any styling related to them must be handled through CSS selectors inside the appropriate CSS files (such as base.css or layout.css) using Tailwind utility classes via the @apply directive.

2) Do not write inline styles directly in the HTML, such as using the style attribute (e.g., <div style="padding:5px"></div>). All styling must be defined inside the appropriate CSS files (base.css, component.css, layout.css, or utility.css) using Tailwind CSS utility classes applied through the @apply directive. The example shown is only to demonstrate what should be avoided, and this rule must be followed for every styling property across the project.

3) Every <a> tag must include the following attributes: href, role="link", target, and aria-label. Each attribute must be written on a new line within the tag for better readability and consistency in the codebase. These attributes are mandatory for all anchor elements to ensure proper accessibility, semantics, and consistent behavior across the project.

4) Every <button> tag must include the following attributes: type="button" or type="submit" and aria-label. Each attribute must be written on a new line within the tag for better readability and consistent code formatting across the project. These attributes are mandatory for all button elements to maintain proper accessibility and standardized behavior.

5) Every <section> element must have a relevant, descriptive class name along with the general-padding sibling class. The section should always contain only these two classes, where the first class represents the specific section name and general-padding ensures consistent vertical spacing across the layout. The actual section class name must be determined based on the section name or context fetched from the Figma design via the MCP server. The example shown is only for demonstration purposes, where hero-section is just a placeholder, and the real class name should reflect the corresponding section identified in Figma.

    Example :
    <section class="hero-section general-padding">
    </section>

6) Every <img> tag must include the following attributes: width, height, and alt. These attributes are mandatory to ensure proper accessibility, layout stability, and optimized rendering across the project. Each attribute must be written on a new line within the tag to maintain consistent formatting and readability in the codebase.

7) Every h1 to h6 element must always be wrapped inside a .title wrapper class along with its corresponding color modifier sibling class. Do not apply any classes directly on the h1 to h6 tags themselves. The color modifier class (e.g., .title-black) must be generated dynamically based on the colors fetched from the Figma design via the MCP server. The example shown is only for demonstration purposes, where title-black is just a placeholder; the actual color class must be determined from the Figma MCP data.

Example : 

   <div class="title title-black">
    <h1>test</h1>
   </div>

8) Every <p> element must be wrapped inside a .content wrapper class along with its corresponding color modifier sibling class. Do not apply any classes directly on the <p> tag. The color modifier class (e.g., .content-black) must be dynamically generated based on the colors identified from the Figma design via the MCP server. The example shown is only for demonstration purposes, where content-black is just a placeholder; the actual color class must be determined from the colors fetched from Figma MCP.

Example : 

    <div class="content content-black">
        <p>test</p>
    </div>

9) The alt attribute of every <img> tag must never be blank. Each image must contain a meaningful and descriptive alt text that accurately describes the image content to ensure proper accessibility and better semantic understanding.

10) If an <a> tag contains a phone number or email address, the href attribute must use the appropriate protocol. Phone numbers must use the format tel:{phone-number}, and email addresses must use mailto:{email-address}. This ensures proper functionality so that clicking the link directly initiates a phone call or opens the default email client.

11) All <section> elements must be placed inside the <main> tag. The <main> element should act as the primary container for the page’s main content, and every section of the page must be wrapped within it to maintain proper semantic HTML structure and accessibility.

12) Only the following Tailwind utility classes are allowed to be used directly in the HTML class attribute: p-*, m-*, max-w-*, flex, flex-col, flex-row, grid, and grid-cols-*. Apart from these specified utilities, no other Tailwind classes should be used directly in HTML. Any additional styling must be implemented by creating custom class names and defining their styles in the appropriate CSS files (base.css, component.css, layout.css, or utilities.css) using the @apply directive with Tailwind utilities, in order to keep the HTML structure clean and well organized.

13) The HTML structure must strictly follow SEO best practices to achieve a higher SEO score in Lighthouse. Ensure the markup uses proper semantic HTML elements, includes all required accessibility attributes, maintains a clear heading hierarchy, and follows optimized structural practices so that the page remains search-engine friendly, accessible, and performant.

14) Every input field must have an associated <label> element. The label should be properly linked to the input using the for attribute on the <label> and the corresponding id attribute on the input field. This ensures better accessibility, usability, and SEO compliance.


15) All code must maintain a clean structure with proper indentation and formatting. HTML, CSS, and any related code should be consistently well-organized, readable, and properly nested, following standard indentation practices to ensure maintainability and clarity across the project.

16) HTML or CSS Should be pixel perfect to the given figma url or link.

========== CSS RULES ========


1) This CSS files we are going to use in projects.
- style.css
- base.css
- component.css
- layout.css
- utilities.css

3) All CSS rules must be written using the @apply directive of Tailwind CSS and placed inside the appropriate files: base.css, component.css, layout.css, and utility.css. Every style must be implemented using Tailwind CSS v4 utility classes only, applied through @apply. Do not write any normal or custom CSS properties in any file. All styling across the project must strictly rely on Tailwind utility classes via @apply, ensuring no raw CSS rules are used anywhere.

4) Use the breakpoints defined in the style.css configuration for all responsive styling. Responsive behavior must be applied using the Tailwind breakpoint utilities such as max-* and min-* prefixes (e.g., max-1024:px-30, min-1199:px-40). Do not use traditional media queries like @media (max-width:768px) or any manual media query rules anywhere in the project. All responsive styles must strictly follow the breakpoint utilities provided in the configuration. The provided code examples are only for explanation purposes to illustrate the rule and should not be relied on as fixed values; the implementation must follow the same pattern using the actual values and tokens defined in the project.

5) Responsive breakpoint utilities must be written within the same @apply directive inside the CSS rule. Do not create multiple @apply directives for handling media queries or responsive styles. All base and responsive Tailwind classes should be combined into a single @apply line within the rule. For example, responsive classes like max-* or min-* must be added directly in the same @apply statement along with the default styles. The example provided is only for explanation purposes to illustrate the rule and should not be treated as fixed values.

Example : 

h1,.h1{
    @apply text-heading-1 max-768:text-20
}

6) Do not use square bracket [] syntax anywhere in the CSS files, since the project is using Tailwind CSS v4, where most values such as spacing, width, height, max-width, max-height, line-height, gap, etc. are already covered by predefined utility variables. Always use the existing Tailwind utility classes or project tokens instead of arbitrary values. Avoid patterns like text-[20px], leading-[24px], or max-w-[452px]. The example shown is only to illustrate what should be avoided, and all styling must rely strictly on the available Tailwind utilities and design tokens.

Example : 

h1{
    @apply text-[20px] leading-[24px] max-w-[452px]
}

7) Never apply fixed height (h-*) or minimum height (min-h-*) to any section or other elements anywhere in the project. Layouts must remain content-driven and flexible, allowing elements to expand naturally based on their content. Avoid setting fixed or minimum heights in any CSS rules. The example shown is only to demonstrate what should not be done, and this rule must be followed consistently for all elements across the project. However, using h-full is acceptable.

Example : 

.zig-zag-section{
    @apply h-320 min-h-200
}

8) Never apply fixed width (w-*) or minimum width (min-w-*) to any section or other elements anywhere in the project. Layouts must remain content-driven and flexible, allowing elements to expand naturally based on their content. Avoid setting fixed or minimum widths in any CSS rules. The example shown is only to demonstrate what should not be done, and this rule must be followed consistently for all elements across the project. However, using w-full is acceptable.

Example : 

.zig-zag-section{
    @apply w-320 min-w-200
}

9) HTML Utility Usage Rule: Only a limited set of Tailwind utility classes should be used directly in the HTML markup. These include layout and spacing utilities such as flex, grid, grid-cols-*, flex-col, flex-row, gap, p-*, and m-*. Apart from these allowed utilities, all other styling must be written inside the CSS files (such as base.css, component.css, layout.css, or utility.css) using Tailwind classes applied through the @apply directive. This ensures that most styling logic remains centralized in the CSS files rather than being written directly in the HTML.


10) style.css will include this things things :

    - INCLUDE FILES :

        Note : Don't Forget to Inclued this files in only this sequantial orders.

        - base.css
        - component.css
        - layout.css
        - utilities.css

    - BREAKPOINTS :

        Note : we will always use this breakpoints in every project.

            --breakpoint-1920: 1921px;
            --breakpoint-1600: 1601px;
            --breakpoint-1512: 1513px;
            --breakpoint-1440: 1441px;
            --breakpoint-1366: 1367px;
            --breakpoint-1199: 1200px;
            --breakpoint-1024: 1025px;
            --breakpoint-992: 993px;
            --breakpoint-768: 769px;
            --breakpoint-640: 641px;
            --breakpoint-576: 577px;
            --breakpoint-425: 426px;
            --breakpoint-375: 376px;


    - SPACING VARIABLE :

        Note : Spacing variable always should be 1px.

        --spacing : 1px;

    - FONT FAMILY :

        Note : Use MCP to fetch all font families from the Figma file and automatically detect every unique font family used in the design. Based on the detected fonts, dynamically generate variables for each font family without using any predefined or hardcoded font-family values. The system should not rely on example fonts or static configurations, as the fonts must always be extracted directly from the Figma design file for each project. Ensure that the generated font-family variables are created dynamically and stored as reusable variables or design tokens so they can be consistently used across the entire project.

        Example : 
        --font-inter-tight: "Inter Tight", sans-serif;
        --font-inter: "Inter", sans-serif;

        All variables related to font-family must be dynamically generated from the Figma data and must not rely on Example Given above.

    - COLORS :

        Note : Use MCP to fetch all colors from the Figma file and automatically detect every unique color used in the design. Based on the detected colors, dynamically generate variables for each color without using any predefined or hardcoded color values. The system should not rely on example colors or static configurations, as the colors must always be extracted directly from the Figma design file for each project. Ensure that the generated color variables are created dynamically and stored as reusable variables or design tokens so they can be consistently used across the entire project.

        Example :
        --color-white : "#FFFFFF";
        --color-black : "#000000";

        All variables colors must be dynamically generated from the Figma data and must not rely on Example Given above.

    - FONT SIZE : 

       Note: Use MCP to fetch all font sizes from the Figma file and identify every unique font size used across the entire design. Sort these font sizes in descending order, where the largest font size is treated as h1, the next as h2, and continue sequentially. Based on this order, generate heading variables in the format --text-heading-1, --text-heading-2, --text-heading-3, --text-heading-4, --text-heading-5, and --text-heading-6. Creating variables from --text-heading-1 to --text-heading-6 is mandatory, and they must always be generated and reused. Each heading variable should be assigned the corresponding font size value fetched from Figma, for example: --text-heading-1: [value_of_font_size]; and continue this pattern until --text-heading-6. For all remaining font sizes that are not part of the heading set, create variables based on their numeric values using the format --text-{size}, such as --text-20 where 20 represents the font-size value detected from Figma. All variables must be dynamically generated from Figma data and should not use any predefined or hardcoded values.

       Example :

       --text-heading-1 : 48px;
       --text-heading-2 : 40px;
       --text-heading-3 : 36px;
       --text-heading-4 : 32px;
       --text-heading-5 : 28px;
       --text-heading-6 : 24px;

       --text-22 : 22px;
       --text-20 : 20px;
       --text-18 : 18px;
       --text-16 : 16px;
       --text-14 : 14px;
       --text-12 : 12px;

       All variables font-size must be dynamically generated from the Figma data and must not rely on Example Given above.

    - Only above mentioned properties must be includes in style.css and wrapped into @theme{}


11) base.css will include this things :

    - All global and foundational styles such as html, body, anchor tags (a), containers, headings, general-padding and paragraph (p) related CSS must be defined inside base.css. This file should contain the base-level styling for these core HTML elements, following the established project rules and using Tailwind utility classes with the @apply directive. The structure demonstrated below is only for reference to explain where these styles belong, and the implementation should follow the same pattern within base.css.

    - HEADING TAGS CSS : 

        Heading Tags CSS Rule: All heading-related CSS must follow a consistent structure using the heading variables. The styles for headings should be written by targeting both the HTML heading tag and its corresponding class (e.g., h1, .h1, h2, .h2, etc.). Each heading should use the appropriate heading token such as text-heading-1 through text-heading-6, and responsive utilities should be included in the same @apply directive when needed. This pattern must be followed consistently from h1 to h6, ensuring that all heading styles are defined using Tailwind classes via @apply. The code shown is only an example to demonstrate the structure, and the actual responsive values should follow the project’s breakpoint rules and tokens.
        
        h1,.h1{
            @apply text-heading-1 max-768:text-22
        } 
        .
        .
        .
        .
        h6,.h6{
            @apply text-heading-6 max-768:text-18
        }

    - PARAGRAPH TAGS CSS : 

        Paragraph Tags CSS Rule: All paragraph-related CSS must follow a consistent structure where every <p> tag in the HTML is wrapped inside a .content class. The styles should target paragraphs within this wrapper (e.g., .content p) and apply Tailwind utility classes using the @apply directive. Additional spacing or relational styling, such as when one paragraph follows another (e.g., .content p + p), should also follow the same approach using Tailwind utilities. The code shown is only an example to demonstrate the required structure, and the actual values should follow the project’s tokens and rules.

        Example : 

        .content p{
            @apply text-16
        }
        
        .content p + p{
            @apply mt-10
        }

    - TITLE COLORS : 

        Title Colors Rule: Create reusable title color classes based on the colors fetched dynamically from the Figma server. For each color detected, generate a wrapper class in the format .title-{color-name} that applies the corresponding text color to all heading elements (h1 to h6) inside it. These classes must target all heading tags within the wrapper and apply the color using Tailwind utility classes via the @apply directive. The color names and values must be derived directly from the Figma data, and no hardcoded or predefined colors should be used. The example shown (using black and white) is only for demonstration purposes to explain the structure; the actual reusable classes must be generated based on the colors fetched from Figma.

        Example :

        .title-white h1,
        .title-white h2,
        .title-white h3,
        .title-white h4,
        .title-white h5,
        .title-white h6{
            @apply text-white
        }

        .title-black h1,
        .title-black h2,
        .title-black h3,
        .title-black h4,
        .title-black h5,
        .title-black h6{
            @apply text-black
        }

    - CONTENT COLORS :

        Content Colors Rule: Create reusable content color classes based on the colors fetched dynamically from the Figma server. For each detected color, generate a wrapper class in the format .content-{color-name} that applies the corresponding text color to all paragraph (p) elements inside it. These styles must use Tailwind utility classes through the @apply directive, and the color names and values must always be derived directly from the Figma data without using any hardcoded or predefined colors. The example shown (using black and white) is only for demonstration purposes to illustrate the structure, and the actual reusable classes must be generated based on the colors retrieved from Figma.

        Example :

        .content-white h1{
            @apply text-white
        }

        .content-black h1{
            @apply text-black
        }

    - CONTAINERS :

        Container Rule: Create container classes based on the horizontal (X-axis) spacing fetched from the Figma design using the MCP server. Do not set any max-width on the container. Instead, use the spacing values from Figma as left and right padding (px). For every unique horizontal spacing value detected, generate a separate container class, where each container represents a different padding size. The padding must be applied using Tailwind utility classes via the @apply directive. The class names can follow a scalable pattern such as .container-fluid, .container-fluid-md, .container-fluid-lg, etc., depending on the spacing values detected. The example provided is only for explanation purposes to demonstrate the structure, and the actual container classes and padding values must be generated dynamically based on the spacing fetched from the Figma server.

        Example : 

        .container-fluid{
            @apply px-50
        }

        .container-fluid-md{
            @appyl px-80
        }

        .container-fluid-lg{
            @apply px-100
        }

    - GENERAL PADDING :

        General Padding Rule : Fetch the section padding values from the Y-axis in the Figma design using the MCP server and create a reusable CSS rule for it inside base.css. This rule should be used across all sections to maintain consistent vertical spacing throughout the project. The padding must be applied using Tailwind utility classes through the @apply directive, and responsive adjustments should follow the project’s breakpoint rules within the same @apply statement. The example provided is only to illustrate the structure, and the actual padding values must be generated based on the spacing fetched from Figma so that the class can be reused consistently across all sections.

        .general-padding{
            @apply py-100 max-1199:py-50 max-768:py-30
        }


12) component.css will include this things :

    - All global components such as buttons, button variants, inputs, textareas, and select elements must be defined inside component.css. Their styles must be implemented using Tailwind CSS utility classes through the @apply directive, and no normal or custom CSS properties should be written. All component styles must follow the project’s design tokens and Tailwind utility-based approach to ensure consistency across the project. The structure shown in examples is only for reference to indicate where and how these styles should be organized, and the actual implementation must follow the same pattern within component.css.

    - BUTTONS :

        Buttons Rule: All button styles must align with the button designs defined in Figma, including font size, colors, spacing, and other visual properties fetched from the Figma server. The global base styles for buttons must be written inside a .btn class, which will contain the common button properties. Different button variants should then be created as sibling modifier classes (e.g., .btn-{variant}) that extend the base .btn class. All styling must be applied using Tailwind CSS utility classes through the @apply directive, and no normal CSS properties should be used. The example classes such as .btn-black and .btn-white are only for reference to demonstrate the structure, and the actual button variants must be generated based on the button styles and colors fetched dynamically from the Figma server.

        .btn{
            @apply px-16 py-8 inline-flex text-center rounded-10 border-1 border-solid cursor-pointer
        }
        .btn-black{
            @apply text-white bg-black border-black hover:bg-white hover:text-white
        }

        NOTE : All button classes should have hover effects with transitions

    - INPUT,TEXTAREA,SELECT : 

        Input Fields Rule: All input fields, textareas, and select elements must match the Figma design exactly, including colors, font sizes, spacing, borders, and other visual properties fetched from the Figma server. Their styles must be implemented inside component.css using Tailwind CSS utility classes through the @apply directive, without writing any normal or custom CSS properties. All values must be derived directly from the Figma data to ensure the components remain consistent with the design system.


13) layout.css will include this things :

    - The layout.css file must contain all styles related to the layout structure of the website, specifically including header and footer related CSS. Any styling associated with the site header, navigation areas within the header, and the footer sections should be written inside layout.css, using Tailwind utility classes through the @apply directive and following the project’s styling rules.


14) utilities.css will include this things :

    - The utilities.css file must contain only additional or helper styles, such as section-related CSS and other extra utility classes, to keep the project well organized. Any styles that do not belong to base, component, or layout CSS should be placed in utilities.css. All styles in this file must follow the project rules and use Tailwind utility classes through the @apply directive, ensuring the CSS structure remains clean and properly organized.


15) Do not create or define any CSS variables inside :root or anywhere else in the CSS files. All required variables are already defined in style.css, and those existing variables must be reused throughout the project. Avoid redefining or duplicating variables in any CSS file.

16) Do not wrap any CSS inside Tailwind @layer directives such as @layer base {}, @layer components {}, or @layer utilities {} in any CSS file. All CSS rules should be written directly in their respective files (base.css, component.css, layout.css, or utilities.css) using the @apply directive with Tailwind utilities, without placing them inside any @layer blocks.

17) In this project there is no tailwind 4 version the version i tailwind 3 so use classed related to that.

18) In this project put the neccessary css in index.css file in the /client folder otherwise add only inline tailwind classes.