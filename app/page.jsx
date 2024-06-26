import Feed from '@components/Feed'
function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Welcome to Promptopia
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptopia is a platform for writing prompts and stories.</p>
      <Feed />
    </section>

  )
}

export default Home