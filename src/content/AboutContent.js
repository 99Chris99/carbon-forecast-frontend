import React from 'react';

const aboutContent = [
{
    key: 'what-is-dog',
    title: "Haven't you heard? Everyone's talking about, About!",
    content: [
      'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome',
      'guest in many households across the world.',
    ].join(' '),
  },
  {
    key: 'kinds-of-dogs',
    title: "Here's some suff about About",
    content: [
      'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog',
      'that they find to be compatible with their own lifestyle and desires from a companion.',
    ].join(' '),
  },
  {
    key: 'acquire-dog',
    title: "Here's even more stuff about About",
    content: {
      content: (
        <div>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </div>
      ),
    },
  },
]

export default {
  aboutContent
}