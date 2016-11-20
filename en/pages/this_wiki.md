# This Wiki 

[gimmick: math]()

This wiki is created with [mdwiki](http://dynalon.github.io/mdwiki/#!index.md) and written in markdown.

The repository is available [here on github](https://github.com/team-diana/team-diana.github.io)

You can edit or write new pages with any text editor, then submit your changes with a pull request.

## prose.io

You can edit this wiki using [prose.io](http://prose.io)

For instance: 

Click on the **Edit this page** button

OR

1. Go to http://prose.io/#team-diana/team-diana.github.io/tree/master/en/pages
2. Choose a page to edit or add a new file (**NEW FILE** button)
3. edit the page using markdown sintax (see [Markdown](this_wiki#Markdown))
4. Click on the right save button in order to push the changes
5. Add a short description of your changes



## Markdown

A reference of the markdown syntax can be found [here](http://daringfireball.net/projects/markdown/syntax)

##Comments


### Inline Comments
Write the comment in a way that is distinguishable from normal wiki content (you can use *** italics *** for instance).
Remember to sign your comment appending your name/email or your github account link with this gimmick

```javascript
[!githubuser](username)
```

warning: this gimmick must still be implemented.

### Discus Comments

<p class='inline-disqus' data-disqus-identifier="this_wiki-1"></p>
Comments can be written by anyone. In order to add a placeholder for comment insert this line:

```html
<p class='inline-disqus' data-disqus-identifier="ID"></p>
```

warning: Remember to add one empty line above and under when embedding html inside markdown.

where __ID__ is a unique id (for the entire wiki). The __ID__ helps to edit the wiki without having to
care about the order of comments. In order to maintain unique id, prepend the name of the page.

hint: In the future, a mdwiki gimmick will be available and will replace the html line above

## Math and LaTeX

In order to use the [Mathjax](http://www.mathjax.org/) library, add this gimmick in the page:

```
[gimmick: math]()
```

the write the expression between the **$$** signs

```
$$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$
```

$$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

warning: Since the file is parsed by markdown, remember that some character must be escaped with **\**

# Change page name

use the **move-page.sh** script inside the *scripts* directory, in the root of the wiki.

The script will also update the internal links.

## Improve MDWiki

If you are a javascript programmer, you can improve mdwiki resolving these issues:

- [Dynamic Gimmicks load #163](https://github.com/Dynalon/mdwiki/issues/163)
- Make the markdown parser ignore mathjax expressions
