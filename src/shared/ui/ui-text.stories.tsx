import type { Meta, StoryObj } from "@storybook/react";
import { UiText } from "./ui-text";

const meta = {
  title: "shared/ui/UiText",
  component: UiText,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "list",
        "inline-code",
        "lead",
        "large",
        "small",
        "muted",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
    },
  },
} satisfies Meta<typeof UiText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="space-y-4">
      <UiText variant="h1">Taxing Laughter: The Joke Tax Chronicles</UiText>
      <UiText variant="h2">The People of the Kingdom</UiText>
      <UiText variant="h3">The Joke Tax</UiText>
      <UiText variant="h4">People stopped telling jokes</UiText>
      <UiText variant="p">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </UiText>
    </div>
  ),
};

export const Paragraph: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="max-w-2xl">
      <UiText variant="p">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </UiText>
      <UiText variant="p">
        This is a second paragraph that demonstrates the automatic margin top
        applied to consecutive paragraphs. The spacing helps create a natural
        reading rhythm.
      </UiText>
    </div>
  ),
};

export const Blockquote: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="max-w-2xl">
      <UiText variant="blockquote">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </UiText>
    </div>
  ),
};

export const List: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <UiText variant="list">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </UiText>
  ),
};

export const InlineCode: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <UiText variant="p">
      You can install dependencies using{" "}
      <UiText variant="inline-code" as="code">
        npm install
      </UiText>{" "}
      command.
    </UiText>
  ),
};

export const Lead: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="max-w-2xl">
      <UiText variant="lead">
        A modal dialog that interrupts the user with important content and
        expects a response.
      </UiText>
    </div>
  ),
};

export const Large: Story = {
  args: {
    children: "Default text",
  },
  render: () => <UiText variant="large">Are you absolutely sure?</UiText>,
};

export const Small: Story = {
  args: {
    children: "Default text",
  },
  render: () => <UiText variant="small">Email address</UiText>,
};

export const Muted: Story = {
  args: {
    children: "Default text",
  },
  render: () => <UiText variant="muted">Enter your email address.</UiText>,
};

export const TextAlignment: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <UiText variant="p" align="left">
        Left aligned text (default)
      </UiText>
      <UiText variant="p" align="center">
        Center aligned text
      </UiText>
      <UiText variant="p" align="right">
        Right aligned text
      </UiText>
      <UiText variant="p" align="justify">
        Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </UiText>
    </div>
  ),
};

export const FontWeight: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="space-y-2">
      <UiText variant="p" weight="normal">
        Normal weight
      </UiText>
      <UiText variant="p" weight="medium">
        Medium weight
      </UiText>
      <UiText variant="p" weight="semibold">
        Semibold weight
      </UiText>
      <UiText variant="p" weight="bold">
        Bold weight
      </UiText>
      <UiText variant="p" weight="extrabold">
        Extrabold weight
      </UiText>
    </div>
  ),
};

export const CustomElement: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <div className="space-y-4">
      <UiText variant="h2" as="div">
        This looks like an h2 but is a div element
      </UiText>
      <UiText variant="p" as="span">
        This looks like a paragraph but is a span element
      </UiText>
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    children: "Default text",
  },
  render: () => (
    <UiText variant="h1" className="text-blue-600 underline">
      Custom styled heading
    </UiText>
  ),
};

export const CompleteExample: Story = {
  name: "Complete Text Example",
  args: {
    children: "Default text",
  },
  render: () => (
    <article className="max-w-3xl space-y-6">
      <UiText variant="h1">The Joke Tax Chronicles</UiText>

      <UiText variant="lead">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </UiText>

      <UiText variant="h2">The King's Plan</UiText>

      <UiText variant="p">
        The king thought long and hard, and finally came up with{" "}
        <UiText variant="inline-code" as="a" className="cursor-pointer">
          a brilliant plan
        </UiText>{" "}
        : he would tax the jokes in the kingdom.
      </UiText>

      <UiText variant="blockquote">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </UiText>

      <UiText variant="h3">The Joke Tax</UiText>

      <UiText variant="p">
        The king's subjects were not amused. They grumbled and complained, but
        the king was firm:
      </UiText>

      <UiText variant="list">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </UiText>

      <UiText variant="p">
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king's
        foolishness get him down: a court jester named Jokester.
      </UiText>

      <UiText variant="h3">Jokester's Revolt</UiText>

      <UiText variant="p">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester.
      </UiText>

      <UiText variant="p">
        And then, one day, the people of the kingdom discovered that the jokes
        left by Jokester were so funny that they couldn't help but laugh. And
        once they started laughing, they couldn't stop.
      </UiText>

      <UiText variant="h2">The People's Verdict</UiText>

      <UiText variant="p">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax. Jokester was declared a hero, and
        the kingdom lived happily ever after.
      </UiText>

      <UiText variant="muted">
        The moral of the story: Never underestimate the power of a good laugh.
      </UiText>
    </article>
  ),
};
