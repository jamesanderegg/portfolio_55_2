import React, { useState } from "react";
import "./BlogPage.css";

const posts = [
  {
    id: "three-js-d3-treemap",
    label: "first post",
    createdDate: "2026-05-12",
    title: "starting portfolio",
    summary:
      "a short kickoff note on this portfolio, d3 treemap navigation, react portals, and three.js mounting.",
  },
  {
    id: "ai-as-a-tool",
    label: "second post",
    createdDate: "2026-05-12",
    title: "practice, ai is a tool",
    summary:
      "a short note on ai, creative practice, references, and using new tools without losing the work.",
  },
];

function formatCreatedDate(value) {
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).replace(",", "").toLowerCase();
}

function BlogIndex({ onSelectPost }) {
  return (
    <section className="blog-page__content blog-page__index" aria-label="blog posts">
      <ol className="blog-page__post-list">
        {posts.map((post, index) => (
          <li className="blog-page__post-item" key={post.id}>
            <span className="blog-page__post-rank">{index + 1}.</span>
            <div className="blog-page__post-main">
              <div className="blog-page__post-heading">
                <button
                  className="blog-page__post-link"
                  type="button"
                  onClick={() => onSelectPost(post)}
                >
                  {post.title}
                </button>
                <span className="blog-page__post-meta">
                  {formatCreatedDate(post.createdDate)}
                </span>
              </div>
              <p className="blog-page__post-summary">{post.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PortfolioArticle() {
  return (
    <>
      <p>
        this is the first post for this portfolio. it is also a note of thanks
        to mike bostock and d3.js. d3 has been one of the clearest tools i have
        used for thinking about data on the web. in this site, data becomes
        layout, and layout becomes navigation.
      </p>

      <p>
        i have worked on versions of this portfolio for a long time. earlier
        versions mixed layout state, component state, and scene code too
        closely. this version is cleaner. d3 owns spatial layout. react owns
        render state. three.js owns the scene after it has a container.
      </p>

      <h2>data structure</h2>
      <p>
        the site starts with treedata.js. that file is a json shaped tree. each
        node can define a name, an id, a description, a value, a color, a
        component hint, a link, and children. that file is the source of truth
        for navigation structure.
      </p>

      <p>
        treemap.js passes that object into d3 hierarchy and treemap. d3
        calculates x0, y0, x1, and y1 values for each node. treemap.js then
        creates one div for each node and positions that div with absolute
        layout. the id from treedata.js becomes the dom id for the matching
        rectangle.
      </p>

      <p>
        that is why adding a section mostly means adding data. a new object in
        treedata.js can create a rectangle, a label, a card description, and a
        route target. if a node needs a custom react view, the id becomes the
        bridge to that view.
      </p>

      <h2>zoom behavior</h2>
      <p>
        when a user clicks a parent node, treemap updates the x and y domains to
        match that branch. d3 transitions the divs into new positions. nodes
        outside the branch are hidden, and the next level inside the branch is
        shown.
      </p>

      <p>
        the same data creates layout and defines what can open next. that keeps
        navigation predictable. it also keeps the page easier to change because
        the hierarchy lives in one file.
      </p>

      <h2>hash links</h2>
      <p>
        the site can also open a node from a url. a link like #blog is read
        from window.location.hash. treemap.js normalizes that value and searches
        d3 descendants for a matching node name, id, or hash field.
      </p>

      <p>
        when it finds a match, it selects that node and zooms to the correct
        branch. that means a shared url can point to a real place in the tree
        instead of only loading the home view. the blog node uses this path, so
        #blog opens the blog section directly.
      </p>

      <h2>react bridge</h2>
      <p>
        statemanagment.js watches the selected treemap node. when the selected
        id matches a project, it finds the matching div. it uses createportal to
        render a react component inside that div.
      </p>

      <p>
        d3 does not render the project. it creates the target area. react
        renders the project into that area when the selected node requires it.
        when the selected node changes, react removes that mounted component and
        mounts the next one when needed.
      </p>

      <h2>three.js scene</h2>
      <p>
        the three.js project is a react component. it has its own camera,
        lights, ground plane, trees, riders, and animation logic. it does not
        need to know about treemap layout. it only needs the container from the
        portal.
      </p>

      <p>
        after mount, the canvas fills the treemap node. the scene then runs
        inside the selected rectangle. when the user navigates away, the
        component unmounts. that matters because three.js scenes can keep
        animation loops, assets, and event handlers alive if they are not
        handled through react cleanup.
      </p>

      <h2>why this structure works</h2>
      <p>
        the main benefit is separation of concerns. d3 handles spatial
        navigation. react handles state and component rendering. three.js
        handles the graphics scene.
      </p>

      <p>
        new sections can be added with data and a portal rule. treemap does not
        need custom drawing code for every project. each project can stay in its
        own component. over time, this has made the portfolio cleaner and
        clearer. the data file describes what exists. treemap describes where it
        goes. the component decides what it does.
      </p>

      <h2>rules that matter</h2>
      <p>
        every interactive node needs a stable id. the portal target must exist
        before the component renders. the component inside the portal should
        fill its container and handle resize changes. selected node state should
        survive redraws so the view does not reset during layout changes.
      </p>

      <p>
        this first post is a marker for the system. the portfolio is not just a
        list of links. it is a data driven interface built with d3, react, and
        three.js. the goal is to keep each part simple enough that the next
        project can be added without rewriting the whole page.
      </p>
    </>
  );
}

function AiToolArticle() {
  return (
    <>
      <p>
        ai to me is a tool. it is a new invention that is moving fast and
        changing how people make things. i understand why people are nervous
        about it, but i do not see it as stealing ideas by default.
      </p>

      <p>
        artists have always learned from other artists. styles get borrowed.
        techniques get reused. references get studied. that is how creativity
        has always worked.
      </p>

      <p>
        when i was in high school, we would look through time magazines for
        images to draw. then google made it possible to search for almost any
        reference image in seconds. now ai lets me create an image from a poem
        or a thought. that is a big jump, but it is still part of the same
        pattern. the tools keep getting faster.
      </p>

      <p>
        the music industry went through this too. the internet changed
        everything. napster and limewire changed how people found music, shared
        music, and thought about ownership. the technology moved faster than the
        systems around it. ai feels similar.
      </p>

      <p>
        for me, ai helps me move through problems. my mind goes on tangents. i
        can get stuck looking for one answer and lose the thread. ai helps me
        keep going without breaking my flow. it helps me organize thoughts
        faster, ask better questions, and get back to the work.
      </p>

      <p>
        but the work is still mine. everything is still a skill. the more times
        you draw a horse, the better you get at drawing a horse, with or
        without a reference photo. the tool can help you see, but it cannot
        practice for you.
      </p>

      <p>
        art is still the practice of life. it is still repetition, attention,
        failure, learning, and doing it just because. ai does not replace that.
        it just gives us another way to keep moving.
      </p>
    </>
  );
}

function BlogArticle({ post, onBackToList }) {
  return (
    <div className="blog-page__content">
      <button className="blog-page__back" type="button" onClick={onBackToList}>
        back to posts
      </button>
      <p className="blog-page__eyebrow">{post.label}</p>
      <h1>{post.title}</h1>
      <p className="blog-page__date">created {formatCreatedDate(post.createdDate)}</p>

      {post.id === "ai-as-a-tool" ? <AiToolArticle /> : <PortfolioArticle />}
    </div>
  );
}

function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <article className="blog-page" aria-label="blog">
      {selectedPost ? (
        <BlogArticle post={selectedPost} onBackToList={() => setSelectedPost(null)} />
      ) : (
        <BlogIndex onSelectPost={setSelectedPost} />
      )}
    </article>
  );
}

export default BlogPage;
