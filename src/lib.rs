use napi::bindgen_prelude::Error;
use napi_derive::napi;

#[napi]
pub struct Segmenter {
    pub(crate) segmenter: pragmatic_segmenter::Segmenter,
}

#[napi]
impl Segmenter {
    #[napi]
    pub fn segment(&self, text: String) -> Vec<String> {
        self.segmenter
            .segment(&text)
            .map(|slice| slice.to_owned())
            .collect()
    }
}

#[napi]
pub fn create_segmenter() -> Result<Segmenter, Error> {
    let prag_segmenter = match pragmatic_segmenter::Segmenter::new() {
        Ok(segmenter) => segmenter,
        Err(err) => return Err(Error::from_reason(err.to_string())),
    };

    Ok(Segmenter {
        segmenter: prag_segmenter,
    })
}
