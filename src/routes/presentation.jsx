

export default function Presentation() {
  return (
    <div>
      <div id="heroes">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5" style={{ fontWeight: "100 !important" }}>Les Éditions Luciférines</h1>
          <div className="col-lg-6 mx-auto" style={{ background: "transparent !important" }}>
            <p className="lead mb-4">Des littératures de l’ombre aux textes transgressifs, les éditions Luciférines avancent vers des courants contraires. L’œil braqué sur le splaterpunk anglo-saxon, l’héritage surréaliste et romantique, nous cherchons l’expression franche et intérieure d’une horreur contemporaine, des égarements de l’esprit, des auteurs, enfin, qui feront plus que vous raconter une histoire. Très attachées aux cultures underground, les éditions Luciférines n’hésitent pas à s’aventurer sur des terrains peu explorés. Créez votre lumière dans l’obscurité, découvrez nos auteurs et nos projets.</p>
            <div className="text-center" style={{ overflow: "hidden" }}>
              <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { window.location = '/presentation' }}>Qui-sommes-nous ?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
