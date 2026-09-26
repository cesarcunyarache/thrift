import React from "react";

const PoliticasPrivacidad = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Políticas de Privacidad</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: 27/11/204</p>
      
      <p className="mb-4">
        En <strong>Thrift</strong>, valoramos y respetamos la privacidad de nuestros usuarios. Estas políticas de privacidad explican cómo recopilamos, utilizamos y protegemos su información personal al interactuar con nuestra plataforma. Al utilizar nuestros servicios, usted acepta los términos descritos a continuación.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">1. Información que recopilamos</h2>
      <p className="mb-4">Recopilamos datos personales y no personales de los usuarios que interactúan con nuestra plataforma:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Datos personales:</strong> Nombre, correo electrónico, y cualquier otra información proporcionada voluntariamente en formularios.
        </li>
        <li>
          <strong>Datos no personales:</strong> Información sobre dispositivos, cookies, direcciones IP y datos de navegación.
        </li>
      </ul>
      <p className="mb-4">
        Cuando nos envíe un comentario o sugerencia a través de nuestros formularios, también recopilaremos la información contenida en ese mensaje.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">2. Uso de la información</h2>
      <p className="mb-4">La información recopilada se utiliza para los siguientes fines:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Proveer y mejorar nuestros servicios.</li>
        <li>Personalizar la experiencia del usuario.</li>
        <li>Responder a comentarios, preguntas o sugerencias.</li>
        <li>Analizar datos para tomar decisiones empresariales informadas.</li>
        <li>
          Mostrar comentarios agradables en nuestra landing page si creemos que son útiles o relevantes para otros usuarios, sujeto al consentimiento otorgado por el usuario.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">3. Uso de comentarios en nuestra landing page</h2>
      <p className="mb-4">
        Queremos destacar las ideas, sugerencias y opiniones que nos ayudan a crecer como empresa. Por eso:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Los comentarios que recibamos a través del formulario podrán ser revisados y seleccionados por nuestro equipo.</li>
        <li>
        Si su comentario es agradable y positivo para la empresa, podríamos publicarlo en la página principal de nuestra plataforma (landing page), acompañado únicamente de su nombre o iniciales, y la foto de perfil asociada a su cuenta, si corresponde.
        </li>
        <li>
          <strong>
            Al aceptar nuestras políticas de privacidad y los términos en el formulario, usted nos otorga permiso para utilizar su comentario públicamente.
          </strong>{" "}
          Si no desea que su comentario sea publicado, puede contactarnos para solicitar su eliminación.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">4. Derechos del usuario</h2>
      <p className="mb-4">Usted tiene derecho a:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Acceder, rectificar o eliminar sus datos personales.</li>
        <li>Retirar su consentimiento en cualquier momento.</li>
        <li>Solicitar la eliminación de un comentario previamente publicado en nuestra plataforma.</li>
      </ul>
      <p className="mb-4">
        Para ejercer cualquiera de estos derechos, por favor escríbanos a: <strong>[Correo electrónico de contacto]</strong>.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">5. Almacenamiento y protección de datos</h2>
      <p className="mb-4">
        Nos comprometemos a garantizar la seguridad de su información mediante medidas técnicas y organizativas adecuadas para protegerla contra accesos no autorizados, pérdida o divulgación.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">6. Cambios en nuestras políticas de privacidad</h2>
      <p className="mb-4">
        Nos reservamos el derecho de actualizar estas políticas en cualquier momento. Cualquier cambio será notificado a través de nuestra plataforma o directamente por correo electrónico.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">7. Contacto</h2>
      <p className="mb-4">
        Si tiene preguntas, dudas o sugerencias sobre nuestras políticas de privacidad, puede contactarnos en:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Correo electrónico:</strong> [tuemail@example.com]
        </li>
        <li>
          <strong>Teléfono:</strong> [Número de teléfono]
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">Aceptación de estas políticas</h2>
      <p className="mb-4">
        Al utilizar nuestra plataforma y enviar comentarios, usted confirma que ha leído y aceptado estas políticas de privacidad.
      </p>
    </div>
  );
};

export default PoliticasPrivacidad;
